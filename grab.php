<?php
ini_set('max_execution_time', 3600);

require_once 'vendor/autoload.php';
require_once 'vendor/phpQuery.inc';
require_once 'functions.php';

class Parser {
	var $base = '';
	var $agentStrs = [
		'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36',
		'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36',
		'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0',
		'Mozilla/5.0 (Windows NT 6.2; rv:22.0) Gecko/20130405 Firefox/23.0',
		'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20130406 Firefox/23.0',
		'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0',
	];

	function __construct($base) {
		$this->base = $base;
	}

	function chooseAgentString() {
		$n = count($this->agentStrs);
		$ix = rand(0, $n - 1);

		return $this->agentStrs[$ix];
	}

	function makeDir($dir) {
		if (!is_dir($dir)) {
			mkdir($dir, 0777, true);
		}
	}

	function getCacheFilename($url) {
		if (!$url) {
			return false;
		}

		$path = str_replace($this->base, '', $url);
		if (!empty($path) && $path[0] === '/') {
			$path = substr($path, 1);
		}

		if (empty($path)) {
			$path = 'index';
		}

		$filename = preg_replace('/[^a-z0-9]+/', '-', strtolower( $path ) );
		$filename = preg_replace('/^-+/', '', $filename);
		$filename .= '.txt';

		return $filename;
	}

	function readCache($url) {
		if (!$url) {
			return false;
		}

		$dir = dirname(__FILE__).'/cache';
		$filepath = $dir.'/'.$this->getCacheFilename($url);

		if (!file_exists($filepath)) {
			return false;
		}

		return file_get_contents($filepath);
	}

	function writeCache($url, $content) {
		if ( !$url || !$content ) {
			return false;
		}

		$dir = dirname(__FILE__).'/cache';
		$this->makeDir($dir);
		$filepath = $dir.'/'.$this->getCacheFilename($url);

		file_put_contents($filepath, $content);
	}

	function curl($url) {
		$html = $this->readCache($url);
		if ($html) {
			return $html;
		}

		$ch = curl_init();
		
		$header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,"; 
		$header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5"; 
		$header[] = "Cache-Control: max-age=0"; 
		$header[] = "Connection: keep-alive"; 
		$header[] = "Keep-Alive: 300"; 
		$header[] = "Accept-Encoding:gzip,deflate,sdch";
		$header[] = "Accept-Language:en-US,en;q=0.8,ko;q=0.6"; 
		$header[] = "Accept-Charset:ISO-8859-1,utf-8;q=0.7,*;q=0.7"; 
		$header[] = "Pragma: "; //browsers keep this blank. 

		$agentStr = $this->chooseAgentString();

		curl_setopt($ch, CURLOPT_USERAGENT, $agentStr); 
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header); 
		curl_setopt($ch, CURLOPT_REFERER, 'http://www.google.com'); 
		curl_setopt($ch, CURLOPT_AUTOREFERER, true); 
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($ch, CURLOPT_URL, $url);

		$html = curl_exec($ch);

		if ($html) {
			$this->writeCache($url, $html);
		}

		return $html;
	}
}

class Main extends Base {
	protected $parser;
	protected $home_url = '';
	protected $urls = [];
	protected $products = [];
	protected $product_count = 0;

	protected function curlFirstPage() {
		$this->product_count = 0;
		$this->products = [];

		$html = $this->parser->curl($this->home_url);
		if (!$html) {
			return false;
		}

		$doc = phpQuery::newDocumentHTML($html);
		if (!$doc) {
			return false;
		}

		$level1 = [];

		$blocks = pq('.hidden-phone .box-category')->children('li');
		foreach ($blocks as $cat) {
			$pa = pq($cat)->children('a');
			$cat = [
				'url' => $pa->attr('href'),
				'title' => str_ireplace('&amp;', '&', trim($pa->html()))
			];

			/*
			if ($cat['title'] === 'SEARCH BY VEHICLE' || $cat['title'] === 'NEW PRODUCTS') {
				continue;
			}
			*/
			if ($cat['title'] !== 'SEARCH BY VEHICLE') {
				continue;
			}

			$level1[] = $cat;
		}

		foreach ($level1 as $cat) {
			$this->curlCategory($cat['url']);
		}

		echo "product_count = ".count($this->products).'<br>';
		pr($this->products);

		// Export products to CSV
		$this->saveCsv('data/opencart-products.csv', $this->products);
	}

	protected function curlCategory($url) {
		// echo $url.'<br>';
		$html = $this->parser->curl($url);

		$doc = phpQuery::newDocumentHTML($html);
		if (!$doc) {
			return false;
		}

		// Grab category path
		$cat_path = [];

		foreach (pq('.breadcrumb')->children('a') as $k => $a) {
			echo $k.'<br>';
			if ($k != 2) {
				continue;
			}

			$pa = pq($a);

			$title = trim($pa->html());
			$title = str_ireplace('&amp;', '&', $title);
			$title = preg_replace('/\s+\/\s+/', ' / ', $title);

			if ($title === 'Home') {
				continue;
			}

			$cat_path[] = $title;
		}

		$str_cat_path = implode(' > ', $cat_path);

		// Grab products
		foreach (pq('.product-list .name') as $product) {
			$pproduct = pq($product);
			$href = $pproduct->attr('href');
			if (!preg_match('/product_id=(\d+)$/', $href, $matches)) {
				continue;
			}

			$product_id = $matches[1];
			$title = str_ireplace('&amp;', '&', trim($pproduct->html()));

			if (isset($this->products[$product_id])) {
				if (strpos($this->products[$product_id], $str_cat_path) === FALSE) {
					$this->products[$product_id]['path'] .= ' | '.$str_cat_path;
				}
			} else {
				$this->products[$product_id] = [
					'id' => $product_id,
					'title' => $title,
					'path' => $str_cat_path
				];
			}
		}

		// Grab subcats
		$subcats = [];
		foreach (pq('.scategory .name') as $cat) {
			$pa = pq($cat);
			$subcats[] = [
				'url' => $pa->attr('href'),
				'title' => trim($pa->html())
			];
		}

		if ($subcats) {
			foreach ($subcats as $subcat) {
				if (empty($subcat['url'])) {
					continue;
				}

				if (strpos($subcat['url'], 'https') === FALSE) {
					continue;
				}

				$this->curlCategory($subcat['url']);
			}
		}

		// Get page count
		$str_pagination_results = pq('.pagination .results')->html();
		if (!preg_match('/\((\d+)\sPages\)/', $str_pagination_results, $matches)) {
			return;
		}
		$max_page = intval($matches[1]);

		// Grab next page
		if (preg_match('/ocpage=(\d+)/', $url, $matches)) {
			$page = intval($matches[1]);
		} else {
			$page = 1;
		}

		//echo $url.'<br>';
		//echo 'page = '.$page.', max_page = '.$max_page.'<br>';

		if ($max_page > 1 && $page < $max_page) {
			// Grab next link
			if ($page === 1 && strpos($url, '&ocpage=') === FALSE) {
				$url_next_page = $url.'&ocpage=2';
			} else {
				$url_next_page = str_replace('&ocpage='.$page, '&ocpage='.($page+1), $url);
			}

			$this->curlCategory($url_next_page);
		}
	}

	protected function start() {
		$this->parser = new Parser($this->home_url);
		$this->curlFirstPage();
	}

	function run() {
		$this->home_url = 'https://dmaxstore.com/products';
		$this->start();
	}
}

$dispatcher = new Main();
$dispatcher->run();

<?php

namespace Model;

class Result {

	private $rows;
	private $count;

	public function __construct($rows, $count) {
		$this->rows = $rows;
		$this->count = $count;

	}

	public function getRows() {
		return $this->rows;
	}

	public function getCount() {
		return $this->count;
	}

}
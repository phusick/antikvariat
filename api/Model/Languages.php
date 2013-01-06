<?php

namespace Model;

class Languages extends Resource {

	public function getItems($app, $range) {

		$query  = ' SELECT';
		$query .= '   [kod_jazyka] as code ';
		$query .= ' , [jazyk] as language ';
		$query .= ' FROM';
		$query .= '   [Jazyky]';
		$query .= ' ORDER BY [zobrazit] DESC';

		$result = \dibi::query($query);

		return $result->fetchAll();
	}

}
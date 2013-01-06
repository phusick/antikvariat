<?php

namespace Model;

class Genres extends Resource {

	public function getItems($app, $range) {

		$query  = ' SELECT';
		$query .= '   [id_zanru] as id ';
		$query .= ' , [zanr] as genre ';
		$query .= ' FROM';
		$query .= '   [Zanr]';
		$query .= ' ORDER BY [zanr] ASC';

		$result = \dibi::query($query);

		return $result->fetchAll();
	}

}
<?php

namespace Model;

class Authors extends Resource {

	public function getItems($app, $range) {

		// $search = $app->request()->params('search');
		$search = trim(str_replace('*', '', $app->request()->params('search')));
		
		if (empty($search)) {
			return array();
		}

		$query  = ' SELECT';
		$query .= '   [autor] as name ';
		$query .= ' FROM';
		$query .= '   [Autori]';
		$query .= ' WHERE [autor] LIKE %like~';

		$result = \dibi::query($query, str_replace('*', '', $search));

		return $result->fetchAll();
	}

}
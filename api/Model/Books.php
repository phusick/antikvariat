<?php

namespace Model;

class Books extends Resource {

	public function getItems($app, $range) {

		$query  = ' SELECT SQL_CALC_FOUND_ROWS';
		$query .= '   [nazev] as title';
		$query .= ' , [autor] as author';
		$query .= ' , [ilustrator] as illustrator';
		$query .= ' , [nakladatel] as publisher';
		$query .= ' , [rok] as published';
		$query .= ' , [zanr] as genre';
		$query .= ' , [cena] as price';
		$query .= ' , [poskozeni] as damage';
		$query .= ' , [Knihy_jazyky].[kod_jazyka] as language';
		$query .= ' FROM';
		$query .= '   [Knihy],[Autori],[Ilustratori],[Nakladatelstvi],[Zanr],[Poskozeni]';
		$query .= ' , [Knihy_jazyky], [Jazyky] ';
		$query .= ' WHERE Knihy.id_autora=Autori.id_autora';
		$query .= ' AND Ilustratori.id_ilustratora=Knihy.id_ilustratora';
		$query .= ' AND Nakladatelstvi.id_nakladatele=Knihy.id_nakladatele';
		$query .= ' AND Zanr.id_zanru=Knihy.id_zanru';
		$query .= ' AND Poskozeni.id_poskozeni=Knihy.id_poskozeni';
		$query .= ' AND Knihy_jazyky.id_knihy=Knihy.id_knihy';
		$query .= ' AND Knihy_jazyky.kod_jazyka=Jazyky.kod_jazyka';
		$query .= ' AND prodano IS NULL';
		$query .= ' AND prodano_kdy IS NULL';

		$query .= ' ORDER BY title';

		if (!is_null($range)) {
			$query .= ' LIMIT ' . $range['from'] . ', ' . $range['to'];
		}

		$result = \dibi::query($query);

		$countResult = \dibi::query('SELECT FOUND_ROWS() as count');

		$rs = new Result($result->fetchAll(), $countResult->fetchSingle());

		return $rs;
	}

}
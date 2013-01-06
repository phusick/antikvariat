<?php

namespace Model;

abstract class Resource {

  abstract public function getItems($app, $range);

  public function getUrlHandler($app) {
    $me = $this;
    return function () use ($app, $me) {
      //$sort = $app->request()->params('sort');
      //$results = $app->request()->params('results');
      //$page = $app->request()->params('page');

      $range = $me->parseRequestRange($app->request());


      $result = $me->getItems($app, $range);
      $rows = json_encode($result->getRows());
      $count = $result->getCount();
      $from = $range['from'];
      $to = $range['to'];

      $app->response()->header('Content-Type', 'application/json');
      $app->response()->header('Content-Range', $me->buildRange($from, $to, $count));
      $app->response()->write($rows);
    };
  }

  public function buildRange($from, $to, $count) {
    $out = "items $from-$to/$count";
    return $out;
  }

  public function parseRequestRange($request) {
    $headers = $request->headers();
    if (!isset($headers['RANGE'])) { return null; }

    $range = $headers['RANGE'];

    $m = explode('=', $range);
    $limit = explode('-', $m[1]);

    return array('from' => $limit[0], 'to' => $limit[1]);
  }

  
}
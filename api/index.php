<?php

require_once 'Slim/Slim.php';
require_once 'dibi/dibi.php';

\Slim\Slim::registerAutoloader();

dibi::connect(array(
    'driver'   => 'mysql',
    'host'     => 'localhost',
    'username' => 'root',
    'password' => '',
    'database' => 'knihy_oukydouky_cz',
    'charset'  => 'utf8',
));



$app = new \Slim\Slim();

$app->get('/', function () use ($app) {
    $app->render('api.html');
});

$booksHandler = new \Model\Books();

$app->get('/books', $booksHandler->getUrlHandler($app));

$app->run();
<?php

// define contant here
if (!defined('MODULE_ROOT')) define('MODULE_ROOT', __DIR__ . '/');

/**
 * @package Tripmata Autoloader
 * @author Amadi Ifeanyi <amadiify.com>
 */
spl_autoload_register(function($className){

    // register namespace
    $namespaceArray = [
        'source' => __DIR__ . '/src/'
    ];

    // check class name
    $className = str_replace('\\', '/', $className);

    // can we break string
    $classNameArray = explode('/', $className);

    // check if we have a namespace
    if (count($classNameArray) > 1) :

        // get the namespace
        $namespace = strtolower($classNameArray[0]);

        // check in namespaceArray
        if (isset($namespaceArray[$namespace])) return (include_once $namespaceArray[$namespace] . end($classNameArray) . '.php');

    endif;

    // check if file exists
    if (file_exists($className . '.php')) include_once $className . '.php';

});
<?php

/**
 * @package constants
 * You can define your constants here
*/
/** @var Lightroom\Core\GlobalConstants $set */
$set->NONE = null;
$set->GET = 'GET';
$set->POST = 'POST';
$set->DELETE = 'DELETE';
$set->PUT = 'PUT';
$set->FETCH_NAMED = PDO::FETCH_NAMED;
$set->FETCH_ASSOC = PDO::FETCH_ASSOC;
$set->FETCH_LAZY = PDO::FETCH_LAZY;
$set->FETCH_NUM = PDO::FETCH_NUM;
$set->FETCH_BOTH = PDO::FETCH_BOTH;
$set->FETCH_OBJ = PDO::FETCH_OBJ;
$set->FETCH_BOUND = PDO::FETCH_BOUND;
$set->FETCH_COLUMN = PDO::FETCH_COLUMN;
$set->FETCH_CLASS = PDO::FETCH_CLASS;
$set->FETCH_INTO = PDO::FETCH_INTO;
$set->FETCH_GROUP = PDO::FETCH_GROUP;
$set->FETCH_UNIQUE = PDO::FETCH_UNIQUE;
$set->FETCH_FUNC = PDO::FETCH_FUNC;
$set->FETCH_KEY_PAIR = PDO::FETCH_KEY_PAIR;
$set->FETCH_CLASSTYPE = PDO::FETCH_CLASSTYPE;
$set->FETCH_SERIALIZE = PDO::FETCH_SERIALIZE;
$set->FETCH_PROPS_LATE = PDO::FETCH_PROPS_LATE;
$set->CAN_CONTINUE = true;
$set->STOP = false;
$set->URL_ENCODE = true;
$set->NO_PREFIX = 'no prefix for table name';
$set->DEFAULT_DATABASE = 'default.database';
$set->ENABLE_CACHING = true;
$set->LOCAL_JS = HOME . '/static/js';
$set->LOCAL_PROPERTY_JS = HOME . '/static/property/js';
$set->LOCAL_CSS = HOME . '/static/css';

// get host
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost:';

// use development constants
if (preg_match('/(frontdesk\.test)/', $host)) :

    $set->CDN_URL = 'http://frontdesk.test/Storage/client/';
    $set->FRONTDESK_CDN = 'http://frontdesk.test/Storage/frontdesk/';
    $set->FILES_CDN = 'http://frontdesk.test/Storage/files/';
    $set->TRIP_MATA_URL = 'http://frontdesk.test/ClientArea/';
    $set->REDIRECT_TO = 'http://frontdesk.test/ListingArea/';
    $set->FRONTDESK_URL = 'http://frontdesk.test/FrontDeskArea/';
    $set->LISTING_SERVICE_API = 'http://frontdesk.test/ListingServices/';
    $set->CLIENT_SERVICE_API = 'http://frontdesk.test/ClientServices/';
    $set->STORAGE_API = 'http://frontdesk.test/Storage/';


else:

    // use live configuration
    $set->CDN_URL = 'http://cdn.tripmata.net/client/';
    $set->FRONTDESK_CDN = 'http://cdn.tripmata.net/frontdesk/';
    $set->FILES_CDN = 'http://cdn.tripmata.net/files/';
    $set->TRIP_MATA_URL = 'http://tripmata.net';
    $set->REDIRECT_TO =   'http://partner.tripmata.net/';
    $set->FRONTDESK_URL = 'http://frontdesk.tripmata.net/';
    $set->LISTING_SERVICE_API = 'http://services.tripmata.net/ListingServices/';
    $set->CLIENT_SERVICE_API = 'http://services.tripmata.net/ClientServices/';
    $set->STORAGE_API = 'http://cdn.tripmata.net/';

endif;

// cont..
$set->CDN_JS_URL = CDN_URL . 'js';
$set->CDN_CSS_URL = CDN_URL . 'css';
$set->CDN_FONT_URL = CDN_URL . 'fonts';
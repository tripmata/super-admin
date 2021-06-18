<?php

use Lightroom\Packager\Moorexa\Router as Route;
use function Lightroom\Requests\Functions\{session, post};
use function Lightroom\Templates\Functions\{render};
/*
 ***************************
 * 
 * @ Route
 * info: Add your GET, POST, DELETE, PUT request handlers here. 
*/

// make request to client service api server
Route::any('property/hms-admin/worker', function(){

    // set content type
    header('Content-Type: application/json');

    // require hms file
    import('includes/hms-admin.php');
});


// make request to listing service api server
Route::post('property/hms-admin/statistics', function(){

    // set content type
    header('Content-Type: application/json');

    // make request to api server
    $response = HttpClient\Http::get(LISTING_SERVICE_API . 'statistics/property/' . $_REQUEST['property']);

    // print text
    echo trim($response->text);
});

// show property info
Route::get('property/{propertyid}', function($propertyid){
    return 'manager/property/'. $propertyid;
});

// log user out
Route::post('(worker/logout|property/worker/logout)', function(){

    // set content type
    header('Content-Type: application/json');

    // unset session
    if (isset($_SESSION['customer_res'])) unset($_SESSION['customer_res']);

    // unset property
    if (isset($_SESSION['property'])) unset($_SESSION['property']);

    // unset usersess
    if (isset($_SESSION['usersess']) && $_SESSION['usersess'] == 'adxc0') unset($_SESSION['usersess']);

    // all good
    echo json_encode([
        'status'    => 'success',
        'url'       => func()->url()
    ], JSON_PRETTY_PRINT);

});

// manager traveller account
Route::get('account', function(){

    // redirect to trip mata main site
    func()->redirect(TRIP_MATA_URL . '/account');
});

// store token
Route::post('store-token', function(){

    // store session token
    $_SESSION['user_token'] = post()->get('token');
    $_SESSION['customer_res'] = post()->get('token');
});

// make route request for module
Route::any('module-{name}/{id}', function($name, $id){
    
    // check property id
    if (isset($_SESSION['property']) && $_SESSION['property'] == $id) :

        // get the module name
        $moduleName = filter_var($name, FILTER_SANITIZE_STRING);

        // check for module
        if (is_dir(HOME . '/modules/' . $moduleName)) :

            // load the index file
            $entryFile = HOME . '/modules/' . $moduleName . '/index.php';

            // define root directory
            if (!defined('MODULE_ROOT')) define('MODULE_ROOT', HOME . '/modules/' . $moduleName . '/');

            // define the module id
            if (!defined('MODULE_ID')) define('MODULE_ID', $id);

            // does file exists
            if (file_exists($entryFile)) include_once $entryFile; 

        endif;
        

    endif;

    // noting to render
    return '';
});
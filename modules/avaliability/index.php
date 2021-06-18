<?php 

// load autoloader
include_once 'autoload.php';

// build date 
$date = (object) [
    'year'      => date('Y'),
    'day'       => date('d'),
    'month'     => date('m')
];

// check for date in request query
if (isset($_GET['date'])) :

    // parse date
    $dateParsed = explode('-', filter_var($_GET['date'], FILTER_SANITIZE_STRING));

    // update date object
    $date->month    = isset($dateParsed[1]) ? intval($dateParsed[1]) : $date->month;
    $date->day      = isset($dateParsed[0]) ? intval($dateParsed[0]) : $date->day;
    $date->year     = isset($dateParsed[2]) ? intval($dateParsed[2]) : $date->year;

endif;

// calculate end (day,month,year)
$endDateTimeStamp = strtotime(date('m/d/Y', strtotime($date->month . '/1/' . $date->year . ' + 1 month')));

// load avaliability manager
$manager = new Source\AvaliabilityManager();

// set default year
$manager->setDefaultYear($date->year);

// set default end timeStamp
$manager->setDefaultEndTimeStamp($endDateTimeStamp);

// set days range
$manager->setDaysRange(1, 31);

// set default day
$manager->setDefaultDay($date->day);

// set default month
$manager->setDefaultMonth($date->month);

// set default timeStamp
$manager->setDefaultTimeStamp(strtotime(date('m/d/Y', strtotime($date->month . '/' . $date->day . '/' . $date->year))));

// check for query
if (isset($_GET['query'])) return $manager->runHTTPQuery();

// render view
$manager->render();
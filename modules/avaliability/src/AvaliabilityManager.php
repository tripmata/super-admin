<?php 
namespace Source;

use HttpClient\Http;
use function Lightroom\Requests\Functions\{post, get};
use Lightroom\Router\Guards\RouteGuard;

/**
 * @package Avaliability Manager
 * @author Amadi Ifeanyi <amadiify.com>
 */
class AvaliabilityManager
{
    /**
     * @var int $DefaultYear
     */
    private $DefaultYear;

    /**
     * @var int $DefaultDay
     */
    private $DefaultDay;

    /**
     * @var int $DefaultMonth
     */
    private $DefaultMonth;
    
    /**
     * @var int $DaysRange
     */
    private $DaysRange = [
        'start' => 0,
        'end'   => 0
    ];

    /**
     * @var string $EndTimeStamp
     */
    private $EndTimeStamp = '';

    /**
     * @var string $StartTimeStamp
     */
    private $StartTimeStamp = '';

    /**
     * @var array $inventoryData
     */
    private $inventoryData = [];

    /**
     * @var *string Constants
     */
    const CATEGORY_NAME_STANDARD = 'Standard Rate (NGN)';
    const CATEGORY_NAME_AVALIABILITY = 'Availability';
    const CATEGORY_NAME_INVENTORY = 'Inventory';
    const CATEGORY_NAME_BOOKED = 'Booked';
    const CATEGORY_NAME_AVALIABLE_ROOMS = 'Avaliable Rooms';

    /**
     * @var object $calendar
     */
    private $calendar = [];

    /**
     * @method AvaliabilityManager setDefaultYear
     * @param int $year
     * @return void
     */
    public function setDefaultYear(int $year) : void
    {
        $this->DefaultYear = $year;
    }

    /**
     * @method AvaliabilityManager setDefaultEndTimeStamp
     * @param string $timeStamp
     * @return void
     */
    public function setDefaultEndTimeStamp(string $timeStamp) : void
    {
        $this->EndTimeStamp = $timeStamp;
    }

    /**
     * @method AvaliabilityManager setDefaultTimeStamp
     * @param string $timeStamp
     * @return void
     */
    public function setDefaultTimeStamp(string $timeStamp) : void
    {
        $this->StartTimeStamp = $timeStamp;
    }

    /**
     * @method AvaliabilityManager getDefaultTimeStamp
     * @return string
     */
    public function getDefaultTimeStamp() : string 
    {
        return $this->StartTimeStamp;
    }

    /**
     * @method AvaliabilityManager setDaysRange
     * @param int $start
     * @param int $end
     * @return void
     */
    public function setDaysRange(int $start, int $end) : void 
    {
        $this->DaysRange['start'] = $start;
        $this->DaysRange['end'] = $end;
    }

    /**
     * @method AvaliabilityManager setDefaultMonth
     * @param int $month
     * @return void
     */
    public function setDefaultMonth(int $month) : void
    {
        $this->DefaultMonth = $month;
    }

    /**
     * @method AvaliabilityManager setDefaultDay
     * @param int $day
     * @return void
     */
    public function setDefaultDay(int $day) : void
    {
        $this->DefaultDay = $day;
    }

    /**
     * @method AvaliabilityManager render
     * @return void
     */
    public function render() : void
    {
        include_once MODULE_ROOT . 'inc/home.php';
    }

    /**
     * @method AvaliabilityManager generateTimeStamp
     * @param int $day
     * @param int $timeStamp
     * @return int
     */
    public function generateTimeStamp(int $day, int $timeStamp) : int
    {
        // build new timestamp
        return strtotime(date('m/d/Y', strtotime(date('m', $timeStamp) . '/' . $day . '/' . date('Y', $timeStamp))));
    }

    /**
     * @method AvaliabilityManager runHTTPQuery
     * @return void
     */
    public function runHTTPQuery()
    {
        // make request to api server
        $response = Http::body([
            'data' => json_encode(post()->all())
        ])->post(LISTING_SERVICE_API . 'property-avaliability/' . MODULE_ID);
    }

    /**
     * @method AvaliabilityManager getTablePlaceholder
     * @return array
     */
    public function getTablePlaceholder() : array
    {
        // make request to api server
        $response = Http::query([
            'start_time_stamp'  => $this->StartTimeStamp, 
            'end_time_stamp'    => $this->EndTimeStamp
        ])->get(LISTING_SERVICE_API . 'property-avaliability/' . MODULE_ID);

        // load calendar
        $this->calendar = $response->json->calendar;

        // return an array
        return [
            'rooms' => $response->json->rooms,
            'categories' => [
                self::CATEGORY_NAME_AVALIABILITY       => PlaceholderConstant::TOGGLE_ENTRY,
                self::CATEGORY_NAME_INVENTORY          => PlaceholderConstant::INPUT_ENTRY,
                self::CATEGORY_NAME_BOOKED             => PlaceholderConstant::TEXT_STRING,
                self::CATEGORY_NAME_AVALIABLE_ROOMS    => PlaceholderConstant::TEXT_STRING,
                self::CATEGORY_NAME_STANDARD           => PlaceholderConstant::INPUT_ENTRY
            ]
        ];
    }

    /**
     * @method AvaliabilityManager generateDisplay
     * @param int $constantID
     * @return string
     */
    public function generateDisplay(int $constantID, ...$args) : string
    {
        /**
         * @var string $response
         */
        $response = '';

        // load from table display
        switch ($constantID) :


            // toggle box
            case PlaceholderConstant::TOGGLE_ENTRY :
            case PlaceholderConstant::TOGGLE_CHECKED :
            case PlaceholderConstant::TOGGLE_NOT_CHECKED :
                // load 
                $response = TableDisplay::AvaliabilityToggleBox(call_user_func_array([$this, 'matchCategoryName'], $args));
            break;

            // input entry
            case PlaceholderConstant::INPUT_ENTRY :
                // load 
                $response = TableDisplay::InputEntryField(call_user_func_array([$this, 'matchCategoryName'], $args));
            break;

            // text string
            case PlaceholderConstant::TEXT_STRING :
                // load 
                $response = TableDisplay::ReadOnlyTextField(call_user_func_array([$this, 'matchCategoryName'], $args));
            break;
            
        endswitch;

        // return string
        return $response;
    }

    /**
     * @method AvaliabilityManager matchCategoryName
     * @param string $categoryName
     * @param array $args
     * @return mixed
     */
    private function matchCategoryName(string $categoryName, ...$args)
    {
        // get roomid
        $roomid = $args[0]->roomcategoryid;

        // get calendar record for this category
        $calendar = isset($this->calendar->{$roomid}) ? $this->calendar->{$roomid} : [];

        // get timestamp
        $timeStamp = $args[1];

        // load calendar data
        $calendarData = isset($calendar->{$timeStamp}) ? $calendar->{$timeStamp} : (object) [];

        // @var int $booked 
        $booked = 0;

        // match category name
        switch ($categoryName) :

            // standard rate ?
            case self::CATEGORY_NAME_STANDARD :
                // int
                return (isset($calendarData->{self::CATEGORY_NAME_STANDARD}) ? $calendarData->{self::CATEGORY_NAME_STANDARD} : (
                    $this->getPeriodicRateOrStandardRate($args[0], $timeStamp)
                ));
            break;

            // room inventory
            case self::CATEGORY_NAME_INVENTORY :
                // int
                $inventory = (isset($calendarData->{self::CATEGORY_NAME_INVENTORY}) ? $calendarData->{self::CATEGORY_NAME_INVENTORY} : (
                    isset($args[0]->inventory) ? $args[0]->inventory : 0
                ));

                // push inventory
                $this->inventoryData[$roomid][$timeStamp]['inventory'] = $inventory;

                // return int
                return $inventory;
            break;

            // avaliability
            case self::CATEGORY_NAME_AVALIABILITY :
                // bool
                return (isset($calendarData->{self::CATEGORY_NAME_AVALIABILITY}) && $calendarData->{self::CATEGORY_NAME_AVALIABILITY} == 'false') ? false : true;
            break;

            // booked 
            case self::CATEGORY_NAME_BOOKED :

                $roomBooked = [];

                // check booked
                if (is_object($args[0]->booked)) :

                    // loop through
                    foreach ($args[0]->booked as $roomNumber => $timeArray) :

                        // check time array
                        foreach ($timeArray as $timeData) :

                            // get checkin
                            $checkin = $timeData->checkin;
                            $checkout = $timeData->checkout;

                            // check time range
                            if ($timeStamp >= $checkin && $timeStamp < $checkout) :

                                if (!isset($timeData->checkedOut)) :
                                    $roomBooked[$roomNumber] = true;
                                endif;

                            endif;

                        endforeach;

                    endforeach;

                endif;

                // update booked 
                $booked = count($roomBooked);

                // push booked
                $this->inventoryData[$roomid][$timeStamp]['booked'] = $booked;
                
                // check
                return $booked;
            break;

            // avaliable rooms
            case self::CATEGORY_NAME_AVALIABLE_ROOMS:

                // @var int $avaliable
                $avaliable = 0;

                // get the room data
                $roomData = $this->inventoryData[$roomid][$timeStamp];

                // get the inventory
                $inventory = isset($roomData['inventory']) ? $roomData['inventory'] : 0;

                // get booked rooms
                $bookedRooms = isset($roomData['booked']) ? $roomData['booked'] : 0;

                // check the inventory
                if ($inventory > 0 && $bookedRooms > 0) $avaliable = ($inventory - $bookedRooms);

                // avaliable is zero
                if ($avaliable == 0 && $bookedRooms == 0) $avaliable = $inventory;

                // int
                return $avaliable;
            break;

        endswitch;
    }

    /**
     * @method AvaliabilityManager getPeriodicRateOrStandardRate
     * @param object $room 
     * @param int $timeStamp
     * @return int
     */
    private function getPeriodicRateOrStandardRate(object $room, int $timeStamp) : int
    {
        // @var int $rate 
        $rate = isset($room->price) ? $room->price : 0;

        // check for new price
        if (isset($room->newPrice)) :

            // get periodic range
            $start = $room->periodic->start;
            $end = $room->periodic->end;

            // check timestamp
            if ($start >= $timeStamp && $timeStamp <= $end) $rate = $room->newPrice;

        endif;

        // return interger
        return $rate;
    }
}
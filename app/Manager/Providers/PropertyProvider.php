<?php
namespace Moorexa\Framework\Manager\Providers;

use Closure;
use HttpClient\Http;
use Lightroom\Packager\Moorexa\MVC\View;
use function Lightroom\Functions\GlobalVariables\{var_get};
use Lightroom\Packager\Moorexa\Interfaces\ViewProviderInterface;
use function Lightroom\Requests\Functions\{session};
/**
 * @package Property View Page Provider
 * @author Moorexa <moorexa.com>
 */

class PropertyProvider implements ViewProviderInterface
{
    /**
     * @var array $arguments
     */
    private $arguments;

    /**
     * @var string $propertyId
     */
    public $propertyId = '';

    /**
     * @method ViewProviderInterface setArguments
     * @param array $arguments
     * 
     * This method sets the view arguments
     */
    public function setArguments(array $arguments) : void {
        $this->arguments = $arguments;
    }

    /**
     * @method ViewProviderInterface viewWillEnter
     * @param Closure $next
     * 
     * This method would be called before rendering view
     */
    public function viewWillEnter(Closure $next) : void
    {
        // get the propetyid
        $this->propertyId = $this->arguments[0];

        // make redirection
        if ($this->propertyId == '') func()->redirect('manager');

        // set item query
        Http::query([
            'itemname'  => 'property',
            'itemvalue' => $this->propertyId,
            'customer'  => var_get('customer_token'),
        ])->get('set-item');

        // get static file
        $static = func()->toArray(json_decode(file_get_contents(MANAGER_PATH . '/property.bundle.json')));

        // set frontdesk token
        $_SESSION['usersess'] = 'adxc0';

        // set the propery id
        $_SESSION['property'] = $this->propertyId;

        // add javascript
        app('assets')->exportVars([
            'property'      => $this->propertyId,
            'html'          => [
                'DASHBOARD_STATS'       => file_get_contents('static/html/dashboard-stats.html'),
                'LODGING_HISTORY'       => file_get_contents('static/html/lodging-history.html'),
                'ACCOUNT_ACTIVITY'      => file_get_contents('static/html/account-activity.html'),
                'CUSTOMER_RESERVATION'  => file_get_contents('static/html/customer-reservations.html'),
                'SETTINGS'              => file_get_contents('static/html/settings-property.html'),
            ],
            'FRONTDESK_MANAGER'     => func()->url('/frontdesk'),
            'AVALIABILITY_MODULE'   => func()->url('/module-avaliability/')
        ]);

        // load session
        session()->set('frontdesk_handshake', base64_encode(json_encode([
            'usersess'  => $_SESSION['usersess'],
            'property'  => $_SESSION['property']
        ])));

        // set bundle
        app('view')->setBundle($static);

        // route passed
        $next();
    }
}
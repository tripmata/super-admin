<?php
namespace Source;
/**
 * @package TableDisplay
 * @author Amadi Ifeanyi <amadiify.com>
 */
class TableDisplay
{
    /**
     * @method TableDisplay AvaliabilityToggleBox
     * @param bool $checked
     * @return string
     */
    public static function AvaliabilityToggleBox(bool $checked = true) : string
    {
        return '<div class="toggle-box '.($checked === false ? '' : 'active').'"></div>';
    }
    
    /**
     * @method TableDisplay InputEntryField
     * @param int $value
     * @return string
     */
    public static function InputEntryField(int $value = 0) : string
    {
        return '<input type="tel" placeholder="0" value="'.$value.'" data-value="'.$value.'" class="input-field"/>';
    }

    /**
     * @method TableDisplay ReadOnlyTextField
     * @param int $value
     * @return string
     */
    public static function ReadOnlyTextField(int $value = 0) : string 
    {
        return '<div class="text-entry-field">'.$value.'</div>';
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 27.09.2016
 * Time: 12:52
 */

namespace app\components;


use yii\bootstrap\Widget;

class HoursTableWidget extends Widget
{
    public $dates;
    public $students;
    public $hours;

    public function init()
    {
        
    }

    public function run()
    {
        return $this->render('hours-table', [
            'students' => $this->students
        ]);
    }
}
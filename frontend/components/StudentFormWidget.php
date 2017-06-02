<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 23.09.2016
 * Time: 1:31
 */

namespace app\components;


use yii\bootstrap\Widget;

class StudentFormWidget extends Widget
{
    public $students;
    public $title;

    public function init()
    {
        if (!$this->students)
        {
            $this->students = [];
        }
        
        if (!$this->title)
        {
            $this->title = 'You have a message:';
        }
    }

    public function run()
    {
        return $this->render('students', ['students' => $this->students, 'title' => $this->title]);
    }
}
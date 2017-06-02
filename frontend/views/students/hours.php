<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 03.10.2016
 * Time: 19:12
 */

use frontend\assets\HoursAsset;

HoursAsset::register($this);

?>
<div class="row">

    <div class="col-xs-3 col-xs-offset-3 table__switch switch--month">
        <div class="switch__arrow arrow--left">&lt;</div>
        <div class="switch__months">
            <div class="month-select">
                <div class="month">Январь</div>
                <div class="month">Февраль</div>
                <div class="month">Март</div>
                <div class="month">Апрель</div>
                <div class="month">Май</div>
                <div class="month">Июнь</div>
                <div class="month">Июль</div>
                <div class="month">Август</div>
                <div class="month">Сентябрь</div>
                <div class="month">Октябрь</div>
                <div class="month">Ноябрь</div>
                <div class="month">Декабрь</div>
            </div>
        </div>
        <div class="switch__arrow arrow--right">&gt;</div>
    </div>

    <div class="col-xs-3 col-xs-offset-3 table__switch switch--year">
        <div class="switch__arrow arrow--left">&lt;</div>
        <div class="switch__years">
            <div class="year-select">
                <div class="year">2017</div>
            </div>
        </div>
        <div class="switch__arrow arrow--right">&gt;</div>
    </div>
</div>

<?= \app\components\HoursTableWidget::widget(['students' => $students]); ?>
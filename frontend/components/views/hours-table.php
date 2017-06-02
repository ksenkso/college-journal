<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 27.09.2016
 * Time: 12:54
 */
use frontend\assets\HoursAsset;

/** @var frontend\models\Students[] $students */
/** @var array $dates */
/** @var array $hours */

HoursAsset::register($this);

?>
<div class="overflow-x">
    <table class="table table-bordered table-responsive table-hover table-hours">
        <thead>
        <tr >
            <th class="">ФИО / Дата</th>
            <?php for ($i = 0; $i < cal_days_in_month(CAL_GREGORIAN, date('n'), date('Y')); $i++): ?>
                <td data-date="<?= date('m') . '.' . ($i+1 >= 10 ? $i+1 : '0' . ($i+1)) ?>"></td>
            <?php endfor; ?>
            <td class="table-hours__total"></td>
        </tr>
        </thead>
        <tbody>
        <?php
        foreach ($students as $student):?>
            <tr>
                <td><?= $student->last_name . ' ' . $student->first_name ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <div class="hours__msg"></div>
</div>


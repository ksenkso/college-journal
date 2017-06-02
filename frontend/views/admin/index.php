<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 25.09.2016
 * Time: 16:48
 */
use yii\helpers\Html;
use yii\helpers\Url;

/** @var frontend\models\Notification[] $notifications */

$this->title = 'Панель администратора';
$this->params['breadcrumbs'][] = $this->title;


?>

<div class="panel">
    

    <?= \app\components\HoursTableWidget::widget(['students' => $students]); ?>
</div>

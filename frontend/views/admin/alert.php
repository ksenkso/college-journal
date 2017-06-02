<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 25.09.2016
 * Time: 21:46
 */
use yii\helpers\Html;

/** @var string $alertClass */
/** @var string $heading */
/** @var string $text */


?>

<div class="panel">
    <div class="alert alert-<?= $alertClass ?>">
        <h1><?= Html::encode($heading) ?></h1>
        <p><?= Html::encode($text) ?></p>
    </div>
</div>

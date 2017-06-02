<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model frontend\models\Hours */

$this->title = 'Create Hours';
$this->params['breadcrumbs'][] = ['label' => 'Hours', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="hours-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>

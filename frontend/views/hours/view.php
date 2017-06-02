<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model frontend\models\Hours */

$this->title = $model->hours_id;
$this->params['breadcrumbs'][] = ['label' => 'Hours', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="hours-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->hours_id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->hours_id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'hours_id',
            'date',
            'student_id',
            'hours',
            'group_id',
            'hours_good',
        ],
    ]) ?>

</div>

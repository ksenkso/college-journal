<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel frontend\models\HoursSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Часы группы';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="hours-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            [
                'attribute' => 'student_id',
                'label' => 'ФИ студента',
                'format' => 'text',
                'content' => function($model) {
                    return $model->getStudentFullName();
                }
            ],
            'date',
            'hours',
            [
                'attribute' => 'group_id',
                'label' => 'Группа',
                'format' => 'text',
                'content' => function($model) {
                    return $model->getGroupName();
                }
            ],
            // 'hours_good',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>

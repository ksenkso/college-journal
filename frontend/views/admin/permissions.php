<?php
use common\models\User;
use yii\grid\GridView;
use yii\helpers\Html;

/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 01.10.2016
 * Time: 9:16
 */

/* @var User[] $users */
/* @var $searchModel common\models\UserSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Управление правами'

?>

<div class="panel" style="float: left;">
    <div class="ovewflow-x">

        <h1><?= Html::encode($this->title) ?></h1>

        <?= GridView::widget([
            'dataProvider' => $dataProvider,
            'columns' => [
                [
                    'label' => 'ФИ',
                    'value' => function (User $user) {
                        return $user->last_name . ' ' . $user->first_name;
                    }
                ],
                [
                    'label' => 'Группа',
                    'value' => function (User $user) {
                        return $user->group->abbrevation . ' ' . $user->group->year . '.' . $user->group->group_number;
                    }
                ],
                [
                    'label' => 'Статус',
                    'value' => function ($data) {
                        switch ($data->status) {
                            case 10:
                                return 'Активен';
                                break;
                            case 20:
                                return 'Неактивен';
                                break;
                            case 0:
                                return 'Удалён';
                                break;
                            default:
                                return 'Активен';
                        }
                    }
                ],
                [
                    'label' => 'Роль',
                    'value' => function (User $user) {
                        $names = $user->getItemNames()->asArray()->all();
                        $res = [];
                        foreach ($names as $name) {
                            $res[] = $name['description'];
                        }
                        return implode(', ', $res);
                    }
                ],/*
                [
                    'class' => 'yii\grid\CheckboxColumn',
                    'label' => 'Права',
                    'content' => function(User $model, $key, $index, $column) {
                        $roles = $model->getItemNames()->asArray()->all();

                    }
                ],*/
                [
                    'class' => 'yii\grid\ActionColumn',
                    'buttons' => [
                        'delete' => function($url, $model, $key) {
                            return '';
                        },
                        'view' => function($url, $model, $key) {
                            return '';
                        },
                        'update' => function($url, User $model, $key) {
                            return Html::a('Изменить', ['admin/editpermissions', 'id' => $model->id]);
                        },
                    ]
                ],
            ],
        ]); ?>
    </div>
</div>


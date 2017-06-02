<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 30.01.2017
 * Time: 20:48
 */

namespace frontend\controllers;

use frontend\models\Event;
use frontend\models\EventSearch;
use Yii;
use yii\rest\ActiveController;

class EventController extends ActiveController
{
    public $modelClass = 'frontend\models\Event';

    public function actions()
    {
        $actions = parent::actions();

        // disable the "delete" and "create" actions
        unset($actions['index'], $actions['create']);

        // customize the data provider preparation with the "prepareDataProvider()" method
        //$actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    public function actionIndex()
    {
        $events = Event::find()->asArray()->all();
        $result = [
            'byId' => [],
            'ids' => []
        ];

        foreach ($events as $event) {
            $event['start_date'] = strtotime($event['start_date']) * 1000;
            $event['end_date'] = strtotime($event['end_date']) * 1000;

            $result['byId'][$event['event_id']] = $event;
            $result['ids'][] = (int)$event['event_id'];
        }

        return $result;
    }

    public function actionCreate()
    {
        $model = new Event();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $model;
        } else {
            return false;
        }
    }

    public function actionUpdate($id)
    {
        $model = EventSearch::findOne($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $model;
        } else {
            return false;
        }
    }

    public function actionView($id)
    {
        return EventSearch::findOne($id);
    }

    public function actionDelete($id)
    {
        EventSearch::findOne($id)->delete();

        return true;
    }

}
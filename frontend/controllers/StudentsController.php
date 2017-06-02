<?php

namespace frontend\controllers;

use common\models\User;
use common\models\UserSearch;
use frontend\models\Group;
use frontend\models\Today;
use Yii;
use frontend\models\Students;
use frontend\models\StudentsSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * StudentsController implements the CRUD actions for Students model.
 */
class StudentsController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    public function actionHours()
    {
        $group_id = User::find()->select(['group_id'])->where(['id' => Yii::$app->getUser()->getId()])->scalar();

        $students = User::find()
	                    ->with('authAssignments')
                        ->where([
				            'and',
					        ['group_id' => $group_id],
				        ])
                        ->orderBy('concat(`last_name`, `first_name`)')
                        ->all();

        $res = [];
	    foreach ( $students as $student ) {
		    foreach ( $student->authAssignments as $auth_assignment ) {
			    if ($auth_assignment->item_name == 'student') {
			        $res[] = $student;
			    }
		    }
        }

        return $this->render('hours', ['students' => $res]);
    }

    /**
     * Lists all Students models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new UserSearch();
        $user = \Yii::$app->getUser();
        $groupId = User::find()->select('group_id')->where(['id' => $user->id])->scalar();
        if (isset(Yii::$app->request->queryParams['StudentsSearch']))
        {
            $params = array_merge(Yii::$app->request->queryParams['StudentsSearch'], ['group_id' => $groupId, 'item_name' => 'student']);
        }
        else
        {
            $params = ['group_id' => (int)$groupId];
        }
        Yii::trace(json_encode(['StudentsSearch' => $params]));
        $dataProvider = $searchModel->search(['UserSearch' => $params]);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Students model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Students model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $student = new Students();
             
                

        if (Yii::$app->request->post()) {

            $student->load(Yii::$app->request->post());
            if ($student->save())
            {
                $id = Students::find()->select(['student_id'])->where([
                    'first_name' => $student->first_name,
                    'last_name' => $student->last_name,
                    'group_id' => $student->group_id
                ])->scalar();
                $today = new Today();
                $today->student_id = $id;
                $today->group_id = $student->group_id;
                $today->hours = '0000';
                $today->save();
            }

            return $this->redirect(['view', 'id' => $student->student_id]);
        } else {
            $user = Yii::$app->getUser();
            if ($user->can('su'))
            {
                $groups = Group::find()->select(['abbrevation', 'group_id'])->indexBy('group_id')->column();
            }
            else
            {
                $groupId = \common\models\User::find()->select('group_id')->where(['id' => $user->id])->scalar();
                $groups = Group::find()->select(['abbrevation', 'group_id'])->where(['group_id' => $groupId])->indexBy('group_id')->column();
            }
            return $this->render('create', [
                'model' => $student,
                'groups' => $groups
            ]);
        }
    }

    /**
     * Updates an existing Students model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->student_id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Students model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Students model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Students the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Students::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}

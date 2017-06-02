<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 25.09.2016
 * Time: 13:31
 */

namespace console\controllers;


use frontend\models\Students;
use Yii;
use common\models\User;
use yii\console\Controller;

class RbacController extends Controller
{
    public function actionInit()
    {
        $auth = Yii::$app->authManager;

        $auth->removeAll();

        $changeStudents = $auth->createPermission('changeStudents');
        $changeStudents->description = 'Change students list';
        $auth->add($changeStudents);

        $student = $auth->createRole('student');
        $student->description = 'Student';
        $auth->add($student);
        
        // add "steward" role and give this role the "changeStudents" permission
        $steward = $auth->createRole('steward');
        $steward->description = 'Steward';
        $auth->add($steward);

        $auth->addChild($steward, $student);
        $auth->addChild($steward, $changeStudents);

        $su = $auth->createPermission('su');
        $su->description = 'Superuser';
        $auth->add($su);

        $admin = $auth->createRole('admin');
        $admin->description = 'Admin';
        $auth->add($admin);
        $auth->addChild($admin, $steward);
        $auth->addChild($admin, $su);

        $user = User::findByUsername('ksenkso');


        $adminRole = $auth->getRole('admin');
        $studentRole = $auth->getRole('student');
        $stewardRole = $auth->getRole('steward');
        $auth->assign($adminRole, $user->getId());
        $auth->assign($studentRole, $user->getId());
        $auth->assign($stewardRole, $user->getId());

    }

    public function actionAdd()
    {
        $auth = Yii::$app->authManager;
        $auth->assign($auth->getRole('student'), 1);
        print_r(array_keys($auth->getRolesByUser(1)));
    }

    private function generate($length = 8)
    {
        $symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $count = strlen($symbols);
        $result = "";
        while ($length--)
        {
            $result .= $symbols[rand(0, $count - 1)];
        }
        return $result;
    }

    public function actionCreate()
    {
        /**
         * @var Students[] $students
         */
        $students = Students::find()->where(['group_id' => 1])->all();
        $auth = Yii::$app->authManager;
        $stRole = $auth->getRole('student');
        foreach ($students as $student) {
            $user = new User();
            $user->username = $this->generate();
            $password = $this->generate(12);
            $message = $user->username . ": " . $student->last_name . " " . $student->first_name . ": " . $password;
            echo $message . " - ";
            file_put_contents('D:\xampp\htdocs\journal.u1470.blue.elastictech.org\passwords.txt', $message . "\n", FILE_APPEND);
            $user->first_name = $student->first_name;
            $user->last_name = $student->last_name;
            $user->email = $this->generate() . "@mail.ru";
            $user->generateAuthKey();


            $user->setPassword($password);
            $user->group_id = $student->group_id;
            $user->save();

            echo "saved. Assigning role: ";

            $auth->assign($stRole, $user->getId());

            echo "done.\n";
        }
        echo "Migration done!";

    }

}
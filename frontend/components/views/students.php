<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 23.09.2016
 * Time: 1:34
 */
/* @var $students array */

?>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel"><?= $title ?></h4>
            </div>
            <div class="modal-body">
            <div class="container-fluid">
                <?php foreach ($students as $student): ?>
                    <div class="row">
                        <div class="col col-xs-10 btn js-students__item" data-id="<?= $student->id ?>">
                            <div class="row">
                                <span class="h3 text-left col-xs-10"><?= $student->last_name . " " . $student->first_name ?></span>

                            </div>
                        </div>
                        <span class="btn btn-success col-xs-1 col-xs-offset-1 js-make-good glyphicon glyphicon-ok" data-id="<?= $student->id ?>"></span>
                    </div>
                <?php endforeach; ?>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Сохранить</button>
            </div>
        </div>
    </div>
</div>
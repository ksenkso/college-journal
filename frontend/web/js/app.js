/**
 * Created by yazun on 23.09.2016.
 */

$(() => {
    window.state = {
        students: []
    };

    let $modal = $('#myModal');
    let $lessons = $('.js-lesson');
    let $students = $('.js-students__item');
    let $saveModalButton = $('.js-submit');
    let $overlay = $('#overlay');
    let $commitButton = $('.js-commit');
    let $clearButton = $('.js-clear');
    const $btnGood = $('.js-make-good');
    

    $.get({
        url: '/site/today'
    })
        .success(r => {
            window.state.students = JSON.parse(r);
            console.log(window.state.students);
            $students.each((i, elem) => {
                let $elem = $(elem);
                const sid = $elem.attr('data-id');
                let data = window.state.students.find( e => e.id ==  sid);
                $elem.data('lesson-0', data.hours[0]);
                $elem.data('lesson-1', data.hours[1]);
                $elem.data('lesson-2', data.hours[2]);
                $elem.data('lesson-3', data.hours[3]);
            });
        });

    $clearButton.on('click', e => {
        $.ajax({
            url: '/api/hours',
            type: 'delete'
        });
    });
    
    $modal.on('shown.bs.modal', e => {
        let lesson = $modal.data('lesson'); //$(e.relatedTarget).data('lesson');

        $students.each((i, elem) => {
            let $elem = $(elem);
            let id = +$elem.attr('data-id');
            let student = window.state.students.find(e => e.id == id);
            const {is_good, hours} = student;

            $elem.data('lesson-0', hours[0]);
            $elem.data('lesson-1', hours[1]);
            $elem.data('lesson-2', hours[2]);
            $elem.data('lesson-3', hours[3]);

            $elem.data('is-good', +is_good);

            switch (hours[lesson]) {
                case 2: {
                    $elem.css('background-color', '#f44336');
                    break;
                }
                case 1: {
                    $elem.css('background-color', '#ffc107');
                    break;
                }
                default: {
                    $elem.css('background-color', '#fff');
                }
            }

            if (+is_good) {
                $elem.css('border-left', '4px solid #4aa967');
            } else {
                $elem.css('border-left', '4px solid transparent');
            }
        });

    });

    $lessons.each((i, elem) => {
        $(elem).data('lesson', i);
    });

    $commitButton.on('click', e => {
        $.post('/site/commit').success(d => console.log(d));
    });

    $saveModalButton.click(() => {

        $overlay.fadeIn();

        let body = window.state.students.map(student => {
            let res = {};
            res.hours = student.hours.join('');
            res.is_good = student.is_good;
            res.id = student.id;
            return res;
        });

       $.ajax({
           type: 'POST',
           url: '/site/post',
           data: {
               students: body
           }
       })
           .error(e => {
               console.error(e);
           })
           .success(d => {
               console.log(d);

           })
           .done(() => {
               console.log('DONE');
               $overlay.fadeOut();
           })
    });

    $lessons.click(e => {
        $modal.modal('show');
        $modal.data('lesson', $(e.target.closest('.js-lesson')).data('lesson'));
    });

    $students.on('click', e => {

        let $elem = $(e.target).closest('.js-students__item');
        const currentLesson = $modal.data('lesson');
        const sid = $elem.attr('data-id');
        const index = window.state.students.findIndex((e, i) => e.id == +sid);
        let hours = $elem.data(`lesson-${currentLesson}`);

        if ( hours != 2) {
            hours = hours == 0 ? 1 : 2;
            $elem.data(`lesson-${currentLesson}`, hours );

            if ($elem.data(`lesson-good-${currentLesson}`) !== 0) {
                $elem.data(`lesson-good-${currentLesson}`, hours);
                window.state.students.find(s => +sid == s.id).hours_good[currentLesson] = hours;
            }

            $elem.css('background-color', hours == 1 ? '#ffc107' : '#f44336');
        } else {
            hours = 0;
            $elem.data(`lesson-${currentLesson}`, hours);
            $elem.css('background-color', 'white');
        }

        window.state.students[index].hours[currentLesson] = hours;
        console.log(window.state.students[index].hours[currentLesson]);
    });

    $btnGood.on('click', e => {
        const $e = $(e.target).closest('.btn');
        const lesson = $modal.data('lesson');
        const $student = $e.siblings().eq(0);

        if ($student.data('is-good')) {
            $student.data('is-good', false);
            $student.css('border-left', '4px solid transparent');
            window.state.students.find(s => +$student.attr('data-id') == s.id).is_good = 0;
        } else {
            $student.data('is-good', true);
            $student.css('border-left', '4px solid #4aa967');
            window.state.students.find(s => +$student.attr('data-id') == s.id).is_good = 1;
        }
        /*    $student.data(`lesson-good-${lesson}`, 0);

            $student.css('border-left', '4px solid transparent');

            window.state.students.find(s => +$student.attr('data-id') == s.id).hours_good[lesson] = 0;
        } else {
            let hours = +$student.data(`lesson-${lesson + 1}`);
            const hoursGood = $student.data(`lesson-good-${lesson}`);
            if (hours == 0) {
                hours = 2;
            }

            if (hoursGood !== undefined && hours <= hoursGood) {
                $student.data(`lesson-${lesson + 1}`, hoursGood);
            }

            $student.data(`lesson-good-${lesson}`, hours);

            $student.css('border-left', '4px solid #4aa967');

            window.state.students.find(s => +$student.attr('data-id') == s.id).hours_good[lesson] = hours;
        }*/

    })
});
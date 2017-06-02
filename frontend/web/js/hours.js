$(() => {


    /**
     * @class App
     * @property students: Array,
     * @property month: null|Number,
     * @property year: null|Number,
     * @property monthSelect: (jQuery|HTMLElement),
     * @property monthPlus: (jQuery|HTMLElement),
     * @property monthMinus: (jQuery|HTMLElement),
     * @property table: (jQuery|HTMLElement),
     * @property msg: (jQuery|HTMLElement)
     */
    class App {
        constructor() {
            this.students = [];
            this.month = null;
            this.year = null;
            this.dates = [];
            this.switchMonth = $('.switch--month');
            this.switchYear = $('.switch--year');
            this.monthSelect = $('.month-select');
            this.monthPlus = this.switchMonth.find('.switch__arrow.arrow--right');
            this.monthMinus = this.switchMonth.find('.switch__arrow.arrow--left');
            this.yearPlus = this.switchYear.find('.switch__arrow.arrow--right');
            this.yearMinus = this.switchYear.find('.switch__arrow.arrow--left');
            this.table = $('.table-hours');
            this.msg = $('.hours__msg');
        }

        static parseHours(hours, hoursGood) {
            return hours.split('').map((hour, i) => `Пара ${i+1}: ${+hour === 0 ? 'Присутствовал' : hour}`);
        }

        changeYear(dir) {
            this.year += dir;
            this.switchYear.find('.year').text(this.year);
            this.getHours().then(students => this.redrawTable(students));
            this.monthSelect.css('transform', `translateY(-${this.month * 20}px)`);
        }

        changeMonth(dir) {
            this.month += dir;
            if (this.month == -1) {
                this.month = 11;
                this.year--;
                this.switchYear.find('.year').text(this.year);
            } else if (this.month == 12) {
                this.month = 0;
                this.year++;
                this.switchYear.find('.year').text(this.year);
            }
            this.monthSelect.css('transform', `translateY(-${this.month * 20}px)`);
        }

        redrawTable(students) {
            this.students = students;
            this.drawTable();
        }

        drawTable() {
            // create date object
            const date = new Date();
            // set date to the last day of current APP month
            date.setFullYear(this.year, this.month + 1, 0);
            // get number of days in the month
            const days = date.getDate();

            // create  container for new table header
            const header = $('<tr></tr>');
            /**
             *
             * @see {cols}
             * @type {jQuery}
             */
            const headerCols = cols(days);
            /**
             * Reset APP dates
             * @type {Array}
             */
            this.dates = [];
            headerCols.each((i, col) => {

                const month = leftpad(date.getMonth() + 1); // create padded month number
                const day = leftpad(i + 1); // create padded day number
                const curDate = `${this.year}-${month}-${day}`; // create a string formatted as in MySQL

                this.dates.push(curDate); // add new date to APP state
                /**
                 * This line sets the `data-date` attribute to the column.
                 * Date will be rendered in the `::before` pseudo-element of the TD, rotated to 90 degrees.
                 */
                $(col).attr('data-date', `${month}.${day}`).data('date', curDate);
            });
            header
                .append($('<th>ФИО / Дата</th>'))
                .append(headerCols)
                .append($('<td></td>')
                    .attr('data-date', 'Всего'))
                .append($('<td></td>')
                    .attr('data-date', 'Ув'));

            this.table.find('thead tr').replaceWith(header);

            this.table.find('tbody tr').each((i, row) => {

                const columns = cols(days + 2);

                $(row).find('td:not(:first)').remove();
                $(row).append(columns);
            });

            (() => {
                const tds = $('table thead td');
                const rows = $('table tbody tr');
                let sumTotal = 0;
                let sumGood = 0;

                app.students.forEach((s, si) => {

                    const row = $(rows[si]).find('td');
                    s.hours.forEach(h => {

                        const col = tds.filter((i, el) => el.getAttribute('data-date') === h.date.replace(/(\d+)-(\d+)-(\d+)/, '$2.$3'));
                        const index = col.index();
                        const cell = $(row.eq(index));
                        const hoursCount = h.hours.split('').reduce((prev, next) => prev += +next, 0);
                        const hoursGood = h.hours_good.split('').reduce((prev, next) => prev += +next, 0);
                        sumTotal += hoursCount;
                        sumGood += hoursGood;

                        cell.text(hoursCount - hoursGood);
                        cell.data('hours', h.hours);
                        cell.data('hours-good', h.hours_good);
                    });
                    row
                        .last()
                        .text(sumGood);
                    row
                        .last()
                        .prev()
                        .text(sumTotal);

                    sumTotal = 0;
                    sumGood = 0;
                });

            })()
        }



        showMessage(hours, e, hoursGood = [0,0,0,0]) {
            let collection = $([]);
            hours.forEach(hour => collection = collection.add($('<div></div>').text(hour)));
            app.msg.html('').append(collection).show();
            app.msg.offset({top: e.pageY, left: e.pageX});
        }

        init() {
            return new Promise((resolve, reject) => {
                const date = new Date();
                this.month = +date.getMonth();
                this.year = +date.getFullYear();
                this.changeMonth(0);
                this.getHours().then(students => {
                    this.students = students;
                    resolve(app);
                });
            })
        }

        getHours() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/site/test/${this.year}/${this.month}`,
                    type: 'get',
                    dataType: 'json',
                    success(res) {
                        if (res.students) {
                            resolve(res.students);
                        }
                    }
                })
            });
        }
    }

    let app = new App();

    window.app = app;

    app.msg.hide(); // hide message initially;
    /**
     * Bind hiding message on click
     */
    app.msg.on('click', e => $(e.target).closest('.hours__msg').hide());

    /**
     * Bind showing message on TD click
     */
    app.table.on('click', 'tbody td:not(:first)', e => {
        const hoursGood = $(e.target).data('hours-good').split('').reduce((prev, next) => prev.concat(+next), []);
        const hours = App.parseHours($(e.target).data('hours'), hoursGood);
        app.showMessage(hours, e, hoursGood);
    });

    app.init().then(app => {
        app.monthPlus.on('click', e => {
            app.changeMonth(1);
            app.getHours().then(app.redrawTable.bind(app))
        });
        app.monthMinus.on('click', e => {
            app.changeMonth(-1);
            app.getHours().then(app.redrawTable.bind(app))
        });

        app.yearPlus.on('click', e => {
            app.changeYear(1);
        });
        app.yearMinus.on('click', e => {
            app.changeYear(-1);
        });

        app.redrawTable(app.students)
    });



    /**
     * Generates TD elements
     *
     * @param {Number} n number of columns
     * @returns {jQuery|HTMLElement}
     */
    const cols = (n) => {
        let r = $([]);
        for (let i = 0; i < n; i++) {
            r = r.add($('<td></td>'));
        }
        return r;
    };

    /**
     * Simple left-padding function
     *
     * @param {*} input
     * @returns {string}
     */
    function leftpad(input) {
        return (""+input).length == 1 ? `0${input}` : `${input}`;
    }



});

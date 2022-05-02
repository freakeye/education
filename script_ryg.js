window.onload = function() {
  var
    btnPower = _O('power'),
    inpTime = _O('inpTime'),
    outTimer = _O('timer'),
    btnTest = _O('Test_mode'),
    btnWork = _O('Work_mode'),
    btnKeep = _O('Keep_mode'),
    redBox = _O('red'),
    yelBox = _O("yellow"),
    greBox = _O("green"),                     // console.log("redBox is " + redBox);
    offClr = 'darkgray',            // default off color
    colors = [offClr, 'red', 'yellow', 'green'],
    len = colors.length;
// init
    btnPower.disabled = false;
    btnPower.checked = false;

// нужны классы для фонарей: CRedLight, CYelLight, CGreLight,
// у которых будут поля redBox, yelBox, greBox соответственно,
// а сами объекты — полями класса(объекта) CTrafficLighter,
// чтобы при смене режима их м.б. (?) создать заново


// Class: Trafficlighter
  function CTrafficLighter() {
    this.red = redBox;              //document.getElementById('red');
    this.yellow = yelBox;           //document.getElementById('yellow');
    this.green = greBox;            // document.getElementById('green');
    this.mode = 'standby';          // режим работы, при вкл. "ждущий"
    this.time;                      // TODO
    this.status = false;            // состояние — включён\выключен
    this.lighter = [greBox, redBox, yelBox, greBox];  // тут — только объекты, а не их style.backgroundColor
    this.errorList = '';
    var len = 4;                    // len — this.countColors;
    var self = this;                // копия, чтобы this-объект был доступен
    this.modeHndlr;                 // handler of setInterval function in current mode

    // time setter
    CTrafficLighter.prototype.setTime = function(value) {
      this.time = value;
    }

    // On/Off toggle — "рубильник"
    CTrafficLighter.prototype.toggle = function(value) {
      if (value === 'On') {
          for (var l = 1; l < len; l++) { this.setLight(l); }
          this.status = true;
      } else {
          this.breaker();
          this.status = false;
      }
    }

    // погасить все фонари
    CTrafficLighter.prototype.breaker = function() {
      _S(this.red).backgroundColor = offClr;
      _S(this.yellow).backgroundColor = offClr;
      _S(this.green).backgroundColor = offClr;
    }

    CTrafficLighter.prototype.setLight = function(boxIndex /*, lightIndex*/) {
      self.lighter[boxIndex].style.backgroundColor = colors[boxIndex]; }
    CTrafficLighter.prototype.offLight = function(boxIndex) {
      self.lighter[boxIndex].style.backgroundColor = colors[0]; }

// set lamp with argument boxIndex to off/on-state
    CTrafficLighter.prototype.toLight = function(boxIndex, to) {
      self.lighter[boxIndex].style.backgroundColor = (to) ? colors[boxIndex] : colors[0];
    }

    // мигание огнём boxIndex q раз с периодом 2*stage; реализовано рекурсией
    CTrafficLighter.prototype.flicker = function(boxIndex, stage, q) {
      var i = 0;                    // "глобальный" счётчик тактов
      rcsF = function(i) {          // console.log('in rscF, i = ' + i);
        if (i < q) {
          if (i % 2 === 0) {        //
            self.offLight(boxIndex);
          } else {
            self.setLight(boxIndex);
          }
          i++;
          setTimeout(rcsF.bind(null, i), stage);  // <=> setTimeout(function() { rcsF(i) }, stage);
          } else {
            i = 0;
          }
        }
      rcsF(i);                      // вызов рекурсивной подфункции в методе
    }

    CTrafficLighter.prototype.testMode = function() {
      var i = 1;                    // счётчик тактов
      // локальная вспомогательная функция — тикер/клокер
      var rygClocker = function() {           // console.log(self.status + '  ' + self.freq);
        self.setLight(i); // self.lighter[i].style.backgroundColor = colors[i];
        self.offLight(i-1); // self.lighter[i-1].style.backgroundColor = colors[0];
        i++;
        if (i === len) {
          i = 1;
        }
      };
      // вызов клокера, периодически
      if (this.mode === 'test') {
        self.modeHndlr = setInterval(rygClocker, self.time);
      }
    }

    CTrafficLighter.prototype.stopMode = function() {
      clearInterval(this.modeHndlr);
      this.breaker();
      this.mode = 'standby';
    }

    CTrafficLighter.prototype.workMode = function() {   console.log(self.status + '  ' + self.time);
      var                           // init
        timeColor = self.time / 3,  // время свечения светоф. огня
        timeBlink = self.time / 9,  // время мигания
        tLR = tLG = timeColor,      // 2/3 - lighting
        tFR = tLY = tFG = timeBlink;// 3*1/9 = 1/3 - flicker and light Yellow
        fq = 3;                     // flicker quantity
      // call
      var worker = function() {     // красный горит tLR [ms], tFR, tLY [ms], tlG [ms], мигание зелёного tFG
        self.setLight(1);
        setTimeout(function() {
            self.offLight(1);
            self.flicker(1, timeBlink/(2*fq), 2*fq);
        }, tLR );
        setTimeout(function() {
            self.offLight(1);
            self.setLight(2);
        }, tLR + tFR );
        setTimeout(function() {
            self.offLight(2);
            self.setLight(3);
        }, tLR + tFR + tLY );
        setTimeout(function() {
            self.flicker(3, timeBlink/(2*fq), 2*fq);
        }, tLR + tFR + tLY + tLG );
        setTimeout(function() {
            self.offLight(3);
            self.setLight(1);
        }, tLR + tFR + tLY + tLG + tFG);
      }
      if (this.mode === 'work') {
        self.modeHndlr = setInterval(worker, self.time);
      }
    }

    //
    CTrafficLighter.prototype.keepMode = function() {
      var phase = true,
          keeplight = this.lighter.indexOf(yelBox); //=2
      var keeper = function() {
        console.log('in keep ' + self.time);
        self.toLight(keeplight, phase);
        phase = !phase;
      };
      if (this.mode === 'keep') {
        self.modeHndlr = setInterval(keeper, self.time / 2);
      }
    }
  }                       // end of class declaration

// global
  var arrayBtn = [btnTest, btnWork, btnKeep];   // array of control button
//
  function availableOtherBtn(argBnt, avail) {      //console.log(argBnt);
    if ( avail ) {                            // disable
      var inDis = arrayBtn.indexOf(argBnt);
      arrayBtn.splice(inDis, 1);            //console.log(arrayBtn);
      for (var i = 0; i < arrayBtn.length; i++) {
        // arrayBtn[i].style.backgroundColor = 'lightblue';
        arrayBtn[i].disabled = true;
      }
    } else {                                  // enable
      for (var i = 0; i < arrayBtn.length; i++) {
        arrayBtn[i].style.backgroundColor = 'moccasin';
        arrayBtn[i].disabled = false;
      }
      arrayBtn.push(argBnt);
/* Остановить текущий метод — Удалить через handlers у функций setInterval !
и перевести в ждущий
      curTl.mode = 'standby'; curTl.breaker(); */
      // delete curTl;
      console.log(curTl);
    }
  }

  var
    curTl = null,
    curFreq; // = inpTime.value,

  btnPower.onclick = isPower;
  btnTest.onclick = clickAction;    // isTest
  btnWork.onclick = clickAction;    // isWork
  btnKeep.onclick = clickAction;    // isKeep

// console.log(btnTest);

  function isPower() {
    curTl = new CTrafficLighter();
    btnTest.style.backgroundColor = 'moccasin';
    btnWork.style.backgroundColor = 'moccasin';
    btnKeep.style.backgroundColor = 'moccasin';
    curTl.toggle('On');
// blocked!
    // console.log(this.parentNode.textContent);
    // console.log(curTl.mode);
    // this.parentNode.textContent = 'On';
    // envTxt = 'On';
    // console.log(this.parentNode.textContent);
    this.disabled = true;
  }

/* сделать объект(массив) из трёх кнопок.
При нажатии любой из них она удаляется их массива */

  function clickAction() {
    console.log(curTl.mode);
    var timeValue = parseInt(inpTime.value);
    if ( curTl.status && (timeValue !== 0) ) {
      var nextMode = this.id.substring(0, 4).toLowerCase(); //console.log(mode);
      if ( curTl.mode === 'standby' ) {       // первое нажатие: переводит свф в нужный режим
          curTl.breaker();
          curTl.mode = nextMode;   console.log(nextMode);
          curTl.time = timeValue;
          curTl[nextMode + 'Mode']();
          // блокировать остальные кнопки!
          availableOtherBtn(this, true);
          // this.style.backgroundColor = offClr; У ОСТАЛЬНЫХ!
          this.innerHTML = nextMode + ' off';
      } else {            // следующее нажатие на эту же кнопку переводит свф в ждущий режим
          curTl.stopMode();
          availableOtherBtn(this, false);
          console.log(arrayBtn);
          this.innerHTML = nextMode;
      }
    } else {
        curTl.errorList = 'Частота светофора задана неверно';
        console.log(curTl.errorList);
    }
  }

}

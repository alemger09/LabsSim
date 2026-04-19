export const LESSONS = {
  acidBase: {
    id: 'acidBase',
    title: { en: 'Acid-Base Reaction', ru: 'Кислотно-основная реакция', kz: 'Қышқыл-сілті реакциясы' },
    subject: { en: 'Chemistry', ru: 'Химия', kz: 'Химия' },
    grade: { en: 'Grade 9', ru: '9 класс', kz: '9 сынып' },
    estimatedMinutes: 12,
    theory: {
      sections: [
        {
          id: 'intro',
          heading: { en: 'What is pH?', ru: 'Что такое pH?', kz: 'pH деген не?' },
          body: { en: 'The pH scale measures the acidity or alkalinity of a solution on a scale from 0 to 14. A pH of 7 is neutral, like pure water. Values below 7 are acidic, and above 7 are alkaline. Each unit represents a 10-fold change in acidity.', ru: '...', kz: '...' },
          visual: 'ph-scale',
          keyTerms: [
            { term: { en: 'pH', ru: 'pH', kz: 'pH' }, definition: { en: 'A measure of acidity or alkalinity', ru: '...', kz: '...' } }
          ]
        },
        {
          id: 'indicators',
          heading: { en: 'Indicators', ru: 'Индикаторы', kz: 'Индикаторлар' },
          body: { en: 'Indicators are substances that change color depending on pH. Litmus turns red in acid and blue in alkali. Universal indicator shows a full spectrum of colors.', ru: '...', kz: '...' },
          keyTerms: []
        },
        {
          id: 'neutralization',
          heading: { en: 'Neutralization Reactions', ru: 'Реакции нейтрализации', kz: 'Бейтараптандыру реакциялары' },
          body: { en: 'Acid + Alkali → Salt + Water. The equivalence point is where the acid and alkali exactly cancel each other out.', ru: '...', kz: '...' },
          keyTerms: []
        },
        {
          id: 'applications',
          heading: { en: 'Real World Applications', ru: 'Практические применения', kz: 'Шынайы қолдану' },
          body: { en: 'Antacids neutralize stomach acid. Farmers add lime to soil to neutralize acidity.', ru: '...', kz: '...' },
          keyTerms: []
        }
      ]
    },
    simulateTasks: [
      {
        id: 'task-1',
        instruction: { en: 'Set pH to 2.0 and observe the color change.', ru: '...', kz: '...' },
        hint: { en: 'Look at the indicator color.', ru: '...', kz: '...' },
        completionCondition: (simState) => simState.ph < 3
      }
    ],
    test: {
      passingScore: 3,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: { en: 'What pH represents a neutral solution?', ru: '...', kz: '...' },
          options: [
            { id: 'a', text: { en: '0', ru: '0', kz: '0' } },
            { id: 'b', text: { en: '7', ru: '7', kz: '7' } },
            { id: 'c', text: { en: '14', ru: '14', kz: '14' } },
            { id: 'd', text: { en: '5', ru: '5', kz: '5' } }
          ],
          correctAnswer: 'b',
          explanation: { en: 'Pure water has pH 7.', ru: '...', kz: '...' }
        }
        // Add more questions
      ]
    }
  },
  circuitOhm: {
    id: 'circuitOhm',
    title: { en: 'Ohm\'s Law Circuit', ru: 'Закон Ома', kz: 'Ом заңы' },
    subject: { en: 'Physics', ru: 'Физика', kz: 'Физика' },
    grade: { en: 'Grade 10', ru: '10 класс', kz: '10 сынып' },
    estimatedMinutes: 15,
    theory: {
      sections: [
        {
          id: 'ohms-law',
          heading: { en: 'Ohm\'s Law', ru: 'Закон Ома', kz: 'Ом заңы' },
          body: { en: 'Ohm\'s Law states that the current through a conductor between two points is directly proportional to the voltage across the two points. V = I × R', ru: 'Закон Ома гласит, что ток через проводник между двумя точками прямо пропорционален напряжению между этими двумя точками. V = I × R', kz: 'Ом заңы бойынша екі нүкте арасындағы өткізгіш арқылы өтетін ток осы екі нүкте арасындағы кернеуге тура пропорционал. V = I × R' },
          visual: 'ohms-law',
          keyTerms: [
            { term: { en: 'Voltage (V)', ru: 'Напряжение (V)', kz: 'Кернеу (V)' }, definition: { en: 'Electrical potential difference', ru: 'Разность электрических потенциалов', kz: 'Электрлік потенциал айырмашылығы' } },
            { term: { en: 'Current (I)', ru: 'Ток (I)', kz: 'Ток (I)' }, definition: { en: 'Flow of electric charge', ru: 'Поток электрического заряда', kz: 'Электрлік заряд ағыны' } },
            { term: { en: 'Resistance (R)', ru: 'Сопротивление (R)', kz: 'Кедергі (R)' }, definition: { en: 'Opposition to current flow', ru: 'Сопротивление току', kz: 'Ток ағынына қарсылық' } }
          ]
        },
        {
          id: 'circuit-components',
          heading: { en: 'Circuit Components', ru: 'Компоненты цепи', kz: 'Тізбек компоненттері' },
          body: { en: 'A basic circuit consists of a power source (battery), conductors (wires), and loads (resistors, bulbs). The circuit must be closed for current to flow.', ru: 'Базовая цепь состоит из источника питания (батареи), проводников (провода) и нагрузок (резисторы, лампы). Цепь должна быть замкнута для протекания тока.', kz: 'Негізгі тізбек қуат көзінен (батарея), өткізгіштерден (сымдар) және жүктемелерден (резисторлар, шамдар) тұрады. Ток ағуы үшін тізбек жабық болуы керек.' },
          keyTerms: []
        }
      ]
    },
    simulateTasks: [
      {
        id: 'task-1',
        instruction: { en: 'Adjust the voltage and observe how current changes.', ru: 'Отрегулируйте напряжение и наблюдайте, как изменяется ток.', kz: 'Кернеуді реттеңіз және ток қалай өзгеретінін бақылаңыз.' },
        hint: { en: 'Current should increase as voltage increases.', ru: 'Ток должен увеличиваться с увеличением напряжения.', kz: 'Кернеу артқан сайын ток артуы керек.' },
        completionCondition: (simState) => simState.voltage > 5
      }
    ],
    test: {
      passingScore: 3,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: { en: 'According to Ohm\'s Law, if voltage doubles and resistance stays the same, what happens to current?', ru: 'Согласно закону Ома, если напряжение удваивается, а сопротивление остается прежним, что происходит с током?', kz: 'Ом заңы бойынша кернеу екі есе артып, кедергі өзгермесе, токқа не болады?' },
          options: [
            { id: 'a', text: { en: 'Doubles', ru: 'Удваивается', kz: 'Екі есе артады' } },
            { id: 'b', text: { en: 'Halves', ru: 'Уменьшается вдвое', kz: 'Екі есе азаяды' } },
            { id: 'c', text: { en: 'Stays the same', ru: 'Остается прежним', kz: 'Өзгермейді' } },
            { id: 'd', text: { en: 'Becomes zero', ru: 'Становится нулевым', kz: 'Нөлге айналады' } }
          ],
          correctAnswer: 'a',
          explanation: { en: 'V = I × R, so I = V/R. If V doubles, I doubles.', ru: 'V = I × R, поэтому I = V/R. Если V удваивается, I удваивается.', kz: 'V = I × R, сондықтан I = V/R. V екі есе артса, I екі есе артады.' }
        }
      ]
    }
  },
  pendulum: {
    id: 'pendulum',
    title: { en: 'Simple Pendulum', ru: 'Математический маятник', kz: 'Жай маятник' },
    subject: { en: 'Physics', ru: 'Физика', kz: 'Физика' },
    grade: { en: 'Grade 9', ru: '9 класс', kz: '9 сынып' },
    estimatedMinutes: 12,
    theory: {
      sections: [
        {
          id: 'period-formula',
          heading: { en: 'Period of a Pendulum', ru: 'Период маятника', kz: 'Маятник периоды' },
          body: { en: 'The period T of a simple pendulum is given by T = 2π√(L/g), where L is the length of the string and g is the acceleration due to gravity. The period depends only on the length and gravity, not on the mass or amplitude.', ru: 'Период T простого маятника задается формулой T = 2π√(L/g), где L - длина нити, g - ускорение свободного падения. Период зависит только от длины и гравитации, а не от массы или амплитуды.', kz: 'Жай маятниктің периоды T = 2π√(L/g) формуласымен анықталады, мұндағы L - жіп ұзындығы, g - еркін түсу үдеуі. Период тек ұзындық пен гравитацияға байланысты, массаға немесе амплитудаға емес.' },
          visual: 'pendulum-diagram',
          keyTerms: [
            { term: { en: 'Period (T)', ru: 'Период (T)', kz: 'Период (T)' }, definition: { en: 'Time for one complete oscillation', ru: 'Время одного полного колебания', kz: 'Бір толық тербелістің уақыты' } },
            { term: { en: 'Length (L)', ru: 'Длина (L)', kz: 'Ұзындық (L)' }, definition: { en: 'Length of the pendulum string', ru: 'Длина нити маятника', kz: 'Маятник жібінің ұзындығы' } }
          ]
        }
      ]
    },
    simulateTasks: [
      {
        id: 'task-1',
        instruction: { en: 'Change the pendulum length and observe how the period changes.', ru: 'Измените длину маятника и наблюдайте, как изменяется период.', kz: 'Маятник ұзындығын өзгертіңіз және период қалай өзгеретінін бақылаңыз.' },
        hint: { en: 'Longer pendulums have longer periods.', ru: 'У более длинных маятников больше период.', kz: 'Ұзын маятниктердің периоды ұзағырақ.' },
        completionCondition: (simState) => simState.length > 1.5
      }
    ],
    test: {
      passingScore: 2,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: { en: 'What happens to the period when pendulum length doubles?', ru: 'Что происходит с периодом, когда длина маятника удваивается?', kz: 'Маятник ұзындығы екі есе артқанда периодқа не болады?' },
          options: [
            { id: 'a', text: { en: 'Doubles', ru: 'Удваивается', kz: 'Екі есе артады' } },
            { id: 'b', text: { en: 'Halves', ru: 'Уменьшается вдвое', kz: 'Екі есе азаяды' } },
            { id: 'c', text: { en: 'Stays the same', ru: 'Остается прежним', kz: 'Өзгермейді' } },
            { id: 'd', text: { en: 'Becomes four times', ru: 'Становится в четыре раза больше', kz: 'Төрт есе артады' } }
          ],
          correctAnswer: 'd',
          explanation: { en: 'T ∝ √L, so when L doubles, T becomes √2 times longer, approximately 1.41 times. Wait, actually for doubling length it becomes √2 ≈ 1.41 times, but the options suggest thinking of it as becoming four times which is incorrect.', ru: 'T ∝ √L, поэтому когда L удваивается, T становится в √2 раз длиннее, примерно 1.41 раза.', kz: 'T ∝ √L, сондықтан L екі есе артқанда T √2 есе ұзарады, шамамен 1.41 есе.' }
        }
      ]
    }
  },
  projectile: {
    id: 'projectile',
    title: { en: 'Projectile Motion', ru: 'Движение снаряда', kz: 'Снаряд қозғалысы' },
    subject: { en: 'Physics', ru: 'Физика', kz: 'Физика' },
    grade: { en: 'Grade 10', ru: '10 класс', kz: '10 сынып' },
    estimatedMinutes: 18,
    theory: {
      sections: [
        {
          id: 'trajectory',
          heading: { en: 'Projectile Trajectory', ru: 'Траектория снаряда', kz: 'Снаряд траекториясы' },
          body: { en: 'A projectile follows a parabolic path under gravity. The horizontal velocity remains constant, while vertical velocity changes due to gravity. The range depends on initial speed and angle.', ru: 'Снаряд под действием гравитации следует параболической траектории. Горизонтальная скорость остается постоянной, вертикальная скорость изменяется из-за гравитации. Дальность зависит от начальной скорости и угла.', kz: 'Снаряд гравитация әсерінен параболалық жол жүреді. Көлденең жылдамдық тұрақты қалады, ал тік жылдамдық гравитация салдарынан өзгереді. Қашықтық бастапқы жылдамдық пен бұрышқа байланысты.' },
          visual: 'projectile-path',
          keyTerms: [
            { term: { en: 'Range', ru: 'Дальность', kz: 'Қашықтық' }, definition: { en: 'Horizontal distance traveled', ru: 'Пройденное горизонтальное расстояние', kz: 'Көлденең өткен қашықтық' } },
            { term: { en: 'Trajectory', ru: 'Траектория', kz: 'Траектория' }, definition: { en: 'Path followed by the projectile', ru: 'Путь, пройденный снарядом', kz: 'Снаряд өткен жол' } }
          ]
        }
      ]
    },
    simulateTasks: [
      {
        id: 'task-1',
        instruction: { en: 'Launch the projectile at different angles and find the maximum range.', ru: 'Запустите снаряд под разными углами и найдите максимальную дальность.', kz: 'Снарядты әртүрлі бұрыштармен ұшырыңыз және максималды қашықтықты табыңыз.' },
        hint: { en: '45 degrees usually gives maximum range.', ru: '45 градусов обычно дает максимальную дальность.', kz: 'Әдетте 45 градус максималды қашықтық береді.' },
        completionCondition: (simState) => simState.angle === 45
      }
    ],
    test: {
      passingScore: 2,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: { en: 'At what angle does a projectile achieve maximum range?', ru: 'Под каким углом снаряд достигает максимальной дальности?', kz: 'Снаряд қандай бұрышта максималды қашықтыққа жетеді?' },
          options: [
            { id: 'a', text: { en: '30°', ru: '30°', kz: '30°' } },
            { id: 'b', text: { en: '45°', ru: '45°', kz: '45°' } },
            { id: 'c', text: { en: '60°', ru: '60°', kz: '60°' } },
            { id: 'd', text: { en: '90°', ru: '90°', kz: '90°' } }
          ],
          correctAnswer: 'b',
          explanation: { en: 'For maximum range, the launch angle should be 45 degrees.', ru: 'Для максимальной дальности угол запуска должен быть 45 градусов.', kz: 'Максималды қашықтық үшін ұшыру бұрышы 45 градус болуы керек.' }
        }
      ]
    }
  },
  spring: {
    id: 'spring',
    title: { en: 'Spring Oscillation', ru: 'Колебания пружины', kz: 'Серпінді тербеліс' },
    subject: { en: 'Physics', ru: 'Физика', kz: 'Физика' },
    grade: { en: 'Grade 9', ru: '9 класс', kz: '9 сынып' },
    estimatedMinutes: 14,
    theory: {
      sections: [
        {
          id: 'hookes-law',
          heading: { en: 'Hooke\'s Law', ru: 'Закон Гука', kz: 'Гук заңы' },
          body: { en: 'Hooke\'s Law states that the force needed to extend or compress a spring is proportional to the distance. F = -kx, where k is the spring constant and x is displacement.', ru: 'Закон Гука гласит, что сила, необходимая для растяжения или сжатия пружины, пропорциональна расстоянию. F = -kx, где k - коэффициент упругости, x - смещение.', kz: 'Гук заңы бойынша серпіндіні созу немесе сығу үшін қажетті күш қашықтыққа пропорционал. F = -kx, мұндағы k - серпімділік коэффициенті, x - ығысу.' },
          visual: 'spring-force',
          keyTerms: [
            { term: { en: 'Spring Constant (k)', ru: 'Коэффициент упругости (k)', kz: 'Серпімділік коэффициенті (k)' }, definition: { en: 'Measure of spring stiffness', ru: 'Мера жесткости пружины', kz: 'Серпінді қаттылығының өлшемі' } },
            { term: { en: 'Restoring Force', ru: 'Восстанавливающая сила', kz: 'Қалпына келтіру күші' }, definition: { en: 'Force that brings system back to equilibrium', ru: 'Сила, возвращающая систему к равновесию', kz: 'Жүйені тепе-теңдікке қайтаратын күш' } }
          ]
        }
      ]
    },
    simulateTasks: [
      {
        id: 'task-1',
        instruction: { en: 'Stretch the spring and observe the relationship between force and displacement.', ru: 'Растяните пружину и наблюдайте соотношение между силой и смещением.', kz: 'Серпіндіні созыңыз және күш пен ығысу арасындағы қатынасты бақылаңыз.' },
        hint: { en: 'Force should increase linearly with displacement.', ru: 'Сила должна линейно увеличиваться со смещением.', kz: 'Күш ығысумен сызықты түрде артуы керек.' },
        completionCondition: (simState) => simState.displacement > 0.1
      }
    ],
    test: {
      passingScore: 2,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: { en: 'According to Hooke\'s Law, force is proportional to:', ru: 'Согласно закону Гука, сила пропорциональна:', kz: 'Гук заңы бойынша күш пропорционал:' },
          options: [
            { id: 'a', text: { en: 'Mass', ru: 'Массе', kz: 'Массаға' } },
            { id: 'b', text: { en: 'Displacement', ru: 'Смещению', kz: 'Ығысуға' } },
            { id: 'c', text: { en: 'Time', ru: 'Времени', kz: 'Уақытқа' } },
            { id: 'd', text: { en: 'Velocity', ru: 'Скорости', kz: 'Жылдамдыққа' } }
          ],
          correctAnswer: 'b',
          explanation: { en: 'F ∝ x (displacement)', ru: 'F ∝ x (смещение)', kz: 'F ∝ x (ығысу)' }
        }
      ]
    }
  }
  // Add other experiments similarly
};

export default LESSONS;
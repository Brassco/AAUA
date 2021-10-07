export default {
  buttons: {
    enter: 'Вхід',
    get_sms_code: 'Замовити SMS код',
    next: 'Далі',
    restore_pass: 'Відновити пароль',
    buy: 'Купити',
  },
  labels: {
    phone_number: 'Номер телефону',
    password: 'Пароль',
    code_from_sms: 'Код із sms',
    repeat_pass: 'Повторіть пароль',
    car_year: 'Рік випуска',
    auto_brand: 'Марка авто',
    city: 'Місто',
    name: "Ім'я",
  },
  placeholders: {
    password: 'Введіть пароль',
    email: 'вкажіть ваш email',
    name: "Вкажіть ім'я",
    city: 'Вкажіть місто',
    auto_brand: 'Вкажіть марку авто',
  },
  modals: {
    error_title: 'Помилка',
    thanks_title: 'Дякуємо',
    sms_sended: 'Смс з кодом відправлено',
    car_number: {
      title: 'Введіть номер',
      cancel: 'Відміна',
      pay: 'Оплатити',
    },
  },
  errors: {
    data_not_filled: 'Не всі поля заповнені або заповнені не вірно',
    registration_error: 'Помилка при реєстрації',
    password_not_matches: 'Пароль та повторний пароль мають бути однакові',
    wrong_email_format: 'Не вірний формат email',
  },
  screen_headers: {
    restore_pass: 'Відновлення пароля',
    personal_data: 'Персональні дані',
  },
  login_screen: {
    forgot_pass: 'Забули пароль',
    registration: 'Реєстрація',
    asociation: 'Асоціація',
    driwers: 'Автомобілістів',
    ukraine: 'України',
  },
  registration_screen: {
    iam_adault: 'Мені вже є 18',
    agree_licence: 'Я ознайомлений з ',
    licence: 'ліцензією',
    agree_get_info: 'Я згоден отримувати інформацію від AAUA',
  },
  valet_screen: {
    screen_header: 'Гаманець',
    grivna_1: 'гривня',
    grivna_2: 'гривні',
    grivna_5: 'гривень',
    add_to_balance: 'Поповнити баланс',
    service_develop: 'Сервіс в розробці',
  },
  bottomMenu: {
    bonus_wog: 'Бонуси WOG',
    messages: 'Повідомлення',
    bonus_aaua: 'Бонуси AAUA',
  },
  leftBarMenu: {
    valet: 'Гаманець',
    discounts: 'Знижки партнерів',
    subscription: 'Підписка AAUA',
    store: 'Магазин',
    fuel: 'Паливо',
    insurance: 'Страховка',
    history: 'Історія покупок',
    feedback: "Зворотній зв'язок",
    questions: 'Питання/відповідь',
    on_road_support: 'Допомога в дорозі',
  },
  discounts_screen: {
    screen_header: 'Знижки партнерів',
    discount_cards: 'Дисконтні карти',
    catalog: 'Каталог',
  },
  permission_request: {
    title: 'AAUA потрібен доступ до геоданних',
    message:
      'За допомогою геолокації ми зможемо встановити вашу адресу автоматично',
  },
  map_screen: {
    modal: {
      close: 'Закрити',
      apply: 'Застосувати',
    },
  },
  subscription_screen: {
    screen_header: 'Підписка AAUA',
    description_header: 'До річної підписки входять:',
    description_tech_asist:
      'Технічний асистент по всій території України: евакуатор, підзарядка акумулятора, аварійне відкриття дверей, доставка пального. Послуга на вибір надається безкоштовно.',
    description_legal_asist:
      'Цілодобова юридична підтримка та консультації «Автоюриста»',
    description_insurance_asist:
      'Послуги страхового адвоката. Адвокат допоможе якісно, оперативно та вчасно оформити документи для виплати по страховому випадку.',
    description_bonus_system: 'Бонусна система AAUA.',
    description_services: 'Консьєрж-сервис 24/7',
    description_details: 'Детальніше',
    description_contract: 'Публічний договір',
  },
  fuel_screen: {
    aaua_card: {
      header: 'Карта AAUA',
      add_card: 'Додати карту',
      add_virtual_card: 'Віртуальна карта',
      description:
        'Для отримання скидки додайте будьласка номер Вашої карти AAUA 7777773xххххххх, аьо згенеруйте віртуальну.',
      description_site:
        'Для активації віртуальної карти і встановлення пін-коду безпеки необхідно зареєструвати карту на сайті',
      description_phone: 'або за номером 0800 300 525.',
      order_virtual_card: 'Замовити віртуальну карту',
      close: 'Закрити'
    },
    add_card: {
      header: 'Додавання картки',
      card_number: 'Номер картки',
      add_card: 'Додати картку',
    }
  },
  on_road_support_screen: {
    header: 'Допомога в дорозі',
    details: {
      thanks: 'Дякуємо',
      close: 'Закрити',
      error: 'Помилка'
    }
  },
  questions_screen: {
    header: 'Питання/Відповідь',
    what_is_aaua: {
      header: 'Що таке програма «AAUA»?',
      description: 'Комплексна система заходів, яка регулює взаємовідносини між Організатором та Учасниками, в рамках якої учасники мають можливість накопичувати бонуси, отримувати нагороди і скидки в результаті покупки товарів і послуг у партнерів Організатора програми.',
    },
    how_get_card: {
      header: 'Як отримати картку учасника програми «AAUA»?',
      description: 'Пакет «Картка учасника», який містить картку і інформаційний буклет, можно отримати безкоштовно через офіційний сайт Організатора (https://www.aaua.com.ua) або через мобільний додаток «AAUA».',
    },
    card_coast: {
      header: 'Скільки коштує карта «AAUA»?',
      description: 'Пакет «Картка учасника», який містить картку і інформаційний буклет, можно отримати безкоштовно через офіційний сайт Організатора (https://www.aaua.com.ua), купуючи товари або послуги у партнерів ассоціації або через мобільний додаток «AAUA».',
    },
    bonuses: {
      header: 'Як нараховуються бонуси?',
      description: 'Нарахування бонусів за покупку палива або товарів і послуг відбувається наступним чином: 1л = 1.5 грн бонусів «WOG», які можна далі використовувати на купівлю палива і товарів в мережі АЗК. 1л = 1 бонус AAUA при купівлі палива в АЗК «WOG» 3% від суми, бонусами AAUA, заплаченої при купівлі товарів або послуг через мобільний додаток «AAUA»',
    },
    when_get_bonuses: {
      header: 'З якого момента я можу накопичувати бонуси?',
      description: 'Бонуси можно відразу після першої покупки на АЗК «WOG» або в мобільному додатку.',
    },
    bonuses_counts: {
      header: 'Як дізнатись скільки всього бонусів я накопив?',
      description: 'Перевірити баланс бонусів можно: - в чеку після кожної покупки на АЗК «WOG»; - в персональному кабінеті на сайті www.aaua.com.ua; - в мобільному додатку «AAUA»; - за телефоном гарячої лінії «AAUA» - 0 800 50 50 24.',
    },
    card_period: {
      header: 'Термін дії карти «AAUA»?',
      description: 'Картка «AAUA» наобмежений термін дії. Дія картки «AAUA» може бути зупинено при відсутності будьяких операцій з використанням картки на протязі 12 місяців.',
    },
    bonuses_period: {
      header: 'Як довго бонуси можуть зберігатись на моїй картці?',
      description: 'Бонуси зберігаються на картці учасника 1 (один) календарний рік з моменту нарахування. У випадку, якщо Учасник за будьякої причини не використав бонуси на протязі вказаного періода, їх залишок автоматично анулюється. Термін дії карти необмежений.',
    },
    bonuses_exchange: {
      header: 'На що я можу обміняти бонуси?',
      description: 'Бонуси «WOG» можно обміняти на паливо і товари в «WOG Маркет». Бонуси «AAUA» можно обміняти на товари і послуги в мобільному додатку «AAUA».',
    },
    bonuses_wog: {
      header: 'Не можу зняти бонуси «WOG»?',
      description: 'Для зняття бонусів «WOG» і встановлення пін-кода необхідно зареєструвати картку за телефоном: 0 800 300 525.',
    },
    how_register: {
      header: 'Як я можу зареєструватись в програмі?',
      description: 'На офіційному сайті Организатора (https://www.aaua.com.ua) або через мобільний додаток «AAUA».',
    }
  }
};
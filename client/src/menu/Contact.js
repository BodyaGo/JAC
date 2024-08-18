import React from 'react';

function Contact() {
  return (
    <section className="bg-gray-50 dark:bg-slate-900" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center mb-16">
          <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">
            
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Зв'яжіться з нами
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-slate-400">
            Не вагайтеся звертатися з будь-якими запитаннями або запитами. Ми завжди готові допомогти!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
          <div className="md:w-1/2 space-y-6">
            <p className="text-lg text-gray-600 dark:text-slate-400">
              Якщо у вас є питання про функції, ціни або будь-що інше, наша команда готова відповісти на всі ваші запитання.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-900 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Наша адреса</h3>
                  <p className="text-gray-600 dark:text-slate-400">м. Київ, вул. Велика Васильківська, 100</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-900 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Контактна інформація</h3>
                  <p className="text-gray-600 dark:text-slate-400">Мобільний: +38 (044) 334 43 41</p>
                  <p className="text-gray-600 dark:text-slate-400">Email: jacmotorsukraine@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-900 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                    <path d="M12 7v5l3 3"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Години роботи</h3>
                  <p className="text-gray-600 dark:text-slate-400">Понеділок - П’ятниця: 08:00 - 17:00</p>
                  <p className="text-gray-600 dark:text-slate-400">Субота та Неділя: Вихідні</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 bg-white dark:bg-slate-800 p-6 md:p-12 rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Готові розпочати?</h2>
            <form id="contactForm">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ім'я</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ваше ім'я"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 dark:bg-slate-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ваша електронна пошта"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 dark:bg-slate-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Повідомлення</label>
                  <textarea
                    id="textarea"
                    name="textarea"
                    placeholder="Напишіть ваше повідомлення..."
                    rows="5"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 dark:bg-slate-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full bg-blue-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Відправити повідомлення
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

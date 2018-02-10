const { Category } = require('../models/category');
const { Province } = require('../models/province');

function seedDatabase() {
    // Categories
    Category.find({}).then((categories) => {
        if (categories.length === 0) {
            ['Budownictwo', 'Malartswo', 'Usługi gastronomiczne'].forEach((name) => {
                const c = new Category({ name });
                c.save();
            });
        }
    });

    // Provinces
    Province.find({}).then((provinces) => {
        if (provinces.length === 0) {
            ['dolnośląskie',
                'kujawsko-pomorskie',
                'lubelskie',
                'lubuskie',
                'łódzkie',
                'małopolskie',
                'mazowieckie',
                'opolskie',
                'podkarpackie',
                'podlaskie',
                'pomorskie',
                'śląskie',
                'świętokrzyskie',
                'warmińsko-mazurskie',
                'wielkopolskie',
                'zachodniopomorskie',
                'podlaskie',
                'lubelskie'
            ].forEach((name) => {
                const p = new Province({ name });
                p.save();
            });
        }
    });
}

module.exports = seedDatabase;

exports.seed = function (knex, Promise) {
    return knex('beats').insert([
        {id: 1, sounds: JSON.stringify(['basskick', 'basskick', 'clap', 'basskick']), timings: JSON.stringify([1000, 2000, 3000, 4000])}
    ])
}
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

50.times do
  Post.create(
    title: Faker::Lorem.question,
    body: Faker::Lorem.paragraph(sentence_count: 1, supplemental: true, random_sentences_to_add: 10),
    views: Faker::Number.between(from: 1, to: 100),
  )
end

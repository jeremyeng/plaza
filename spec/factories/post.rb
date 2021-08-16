FactoryBot.define do
  factory :post do
    title { Faker::Lorem.question }
    body { Faker::Lorem.paragraph(sentence_count: 1, supplemental: true, random_sentences_to_add: 10) }
    views { Faker::Number.between(from: 1, to: 100) }
  end
end

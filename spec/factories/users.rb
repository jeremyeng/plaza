FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "Abcd1234" }
  end
end

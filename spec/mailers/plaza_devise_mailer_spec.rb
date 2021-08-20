require "rails_helper"

RSpec.describe PlazaDeviseMailer, type: :mailer do
  let(:user) { FactoryBot.create(:user, email: "user@example.com") }

  describe "account confirmation" do
    let(:mail) { PlazaDeviseMailer.confirmation_instructions(user, "faketoken") }

    it "renders the headers" do
      expect(mail.subject).to eq("Confirmation instructions")
      expect(mail.to).to eq(["user@example.com"])
      expect(mail.from).to eq(["accounts@enqueria.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Welcome user@example.com!")
      expect(mail.body.encoded).to match("You can confirm your account email through the link below:")
    end
  end

  describe "password reset" do
    let(:mail) { PlazaDeviseMailer.reset_password_instructions(user, "faketoken") }

    it "renders the headers" do
      expect(mail.subject).to eq("Reset password instructions")
      expect(mail.to).to eq(["user@example.com"])
      expect(mail.from).to eq(["accounts@enqueria.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hello user@example.com!")
      expect(mail.body.encoded).to match("Someone has requested a link to change your password. You can do this through the link below.")
      expect(mail.body.encoded).to match("If you didn't request this, please ignore this email.")
      expect(mail.body.encoded).to match("Your password won't change until you access the link above and create a new one.")
    end
  end

  describe "email changed" do
    let(:mail) { PlazaDeviseMailer.email_changed(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Email Changed")
      expect(mail.to).to eq(["user@example.com"])
      expect(mail.from).to eq(["accounts@enqueria.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hello user@example.com!")
      expect(mail.body.encoded).to match("We're contacting you to notify you that your email has been changed to user@example.com.")
    end
  end

  describe "password change" do
    let(:mail) { PlazaDeviseMailer.password_change(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Password Changed")
      expect(mail.to).to eq(["user@example.com"])
      expect(mail.from).to eq(["accounts@enqueria.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hello user@example.com!")
      expect(mail.body.encoded).to match("We're contacting you to notify you that your password has been changed.")
    end
  end
end

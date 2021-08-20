# Preview all emails at http://localhost:3000/rails/mailers/test
class PlazaDeviseMailerPreview < ActionMailer::Preview
  def confirmation_instructions
    PlazaDeviseMailer.confirmation_instructions(User.first, "faketoken", {})
  end

  def reset_password_instructions
    PlazaDeviseMailer.reset_password_instructions(User.first, "faketoken", {})
  end

  def email_changed
    PlazaDeviseMailer.email_changed(User.first, {})
  end

  def password_change
    PlazaDeviseMailer.password_change(User.first, {})
  end
end

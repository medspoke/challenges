# frozen_string_literal: true
class User < ApplicationRecord
  has_many :posts

  validates_presence_of :first_name, :last_name, :email

  scope :search, -> (query) {
    where('users.email ILIKE :query OR users.first_name ILIKE :query OR users.last_name ILIKE :query ', query: "%#{query}%") # rubocop:disable Metrics/LineLength
  }

  def full_name
    "#{first_name} #{last_name}"
  end
end

# frozen_string_literal: true
class Author < ApplicationRecord
  has_many :images

  validates_presence_of :username

  scope :search, -> (query) {
    where('authors.username ILIKE :query OR authors.first_name ILIKE :query OR authors.last_name ILIKE :query ', query: "%#{query}%") # rubocop:disable Metrics/LineLength
  }

  def full_name
    "#{first_name} #{last_name}"
  end
end

# frozen_string_literal: true
describe Resolvers::GetAuthors, type: :graphql do
  let!(:context) do
    create_context
  end

  subject(:resolver) { described_class.new(object: nil, context: context) }

  it { is_expected.to be_of_type([Types::AuthorType]) }
  it { is_expected.to accept_arguments(search: types.String) }

  describe '#call' do
    context 'when some authors exist' do
      let!(:author_1) { create :author, first_name: 'Jan' }
      let!(:author_2) { create :author, first_name: 'Martin' }
      let!(:author_3) { create :author, first_name: 'John' }

      it 'returns all authors' do
        # when
        authors = resolver.resolve

        # then
        expect(authors).to match_array([author_1, author_2, author_3])
      end

      context 'when search query is specified' do
        let(:args) do
          { args: { search: 'Foo' } }
        end

        it 'when none of authors matches the search query' do
          it 'returns empty array' do
            # when
            authors = resolver.resolve(args)

            # then
            expect(authors).to match_array([])
          end
        end

        context 'when first author matches the search query' do
          before do
            args[:search] = 'Arthur'
          end

          let!(:searched_author) { create :author, first_name: 'Arthur' }

          it 'returns searched author' do
            # when
            authors = resolver.resolve(args)

            # then
            expect(authors).to match_array([searched_author])
          end
        end
      end
    end

    context 'when no authors exist' do
      it 'returns empty array' do
        # when
        authors = resolver.resolve

        # then
        expect(authors).to match_array([])
      end
    end
  end
end

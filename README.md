## get going

`npm install`
`npm start`
`profit`

## get testing

`npm test`

## deploy

The repo is setup to auto deploy when a branch is merged to the 'master' branch. To push changes to production, create a PR and check the preview link that everything is working fine in the staging environment.

Then ask for a review on your PR. Once merged a Github Action will handle deploying to production!
create production artifacts (optional)

### How to do it manually
`firebase deploy`
This is only available for Admin users of the firebase project. 

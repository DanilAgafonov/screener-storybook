//  Receive raw stories we pull from the storybook server via puppeteer, align them for
//  legacy steps processing.
//
exports.alignStories = function(rawStories) {
  if (typeof rawStories === 'object') {
    if (rawStories.constructor === Array) {
      console.info('screener-storybook standard stories array detected');
      return rawStories;
    } else {
      console.info('screener-storybook stories not returned in array, re-aligning ..');
      const embeddedStories = rawStories.stories;
      const objectToArray = Object.keys(embeddedStories);
      return objectToArray.map( (key) => {
        const storeObject = embeddedStories[key];
        let objectStory = { name: storeObject.name };
        return {
          kind: storeObject.kind,
          stories: [ objectStory ]
        };
      });
    }
  }

  console.warn('screener-storybook raw stories was not recognized, using raw data');
  return rawStories;
};

const index = require('../src/index.js');

describe('validatePath', () => {
  it('is a function', () => {
    expect(typeof index.validatePath).toBe('function');
  });
  it('Relative path should return a false', () => {
    const input = 'rutaPrueba';
    const output = false;
    expect(index.validatePath(input)).toEqual(output);
  });
  it('Absolute path should return true', () => {
    const input = 'directory';
    const output = true;
    expect(index.validatePath(input)).toEqual(output);
  });
});

describe('toAbsolutePath ', () => {
  it('is a function', () => {
    expect(typeof index.toAbsolutePath).toBe('function');
  });
  it('should return an absolute path', () => {
    const input = 'directory';
    const output = 'C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory';
    expect(index.toAbsolutePath(input)).toEqual(output);
  });
});

describe('isDirectory', () => {
  it('is a function', () => {
    expect(typeof index.isDirectory).toBe('function');
  });
  it('should return true if the path is from a directory', () => {
    const inputTres = 'directory';
    const outputTres = true;
    expect(index.isDirectory(inputTres)).toEqual(outputTres);
  });
});

describe('isAfile', () => {
  it('is a function', () => {
    expect(typeof index.isAfile).toBe('function');
  });
  it('should return true if the path is from a file', () => {
    const inputCuatro = './directory/prueba.md';
    const outputCuatro = true;
    expect(index.isAfile(inputCuatro)).toEqual(outputCuatro);
  });
});


describe('showDirectory', () => {
  it('is a function', () => {
    expect(typeof index.showDirectory).toBe('function');
  });
  it('should return an array with all files in a directory', () => {
    expect(index.showDirectory('directory'))
      .toEqual([
        'ASDFPixelSort-master',
        'definitionGlitch.txt',
        'glitchArtGenerator.md',
        'prueba.md',
        'README.md'
      ]);
  });
});

describe('mdFile', () => {
  it('is a function', () => {
    expect(typeof index.mdFile).toBe('function');
  });
  it('should return true when the file is a file with extension .md', () => {
    expect(index.mdFile('directory/prueba.md'))
      .toBe(true);
  });
  it('should return false when the file is not a .md file extension', () => {
    expect(index.mdFile('./directory/definitionGlitch.txt'))
      .toBe(false);
  });
});

describe('getLinksFromMd', () => {
  it('is a function', () => {
    expect(typeof index.getLinksFromMd).toBe('function');
  });
  it('should return an array with the links of a markdown file', () => {
    expect(index.getLinksFromMd('./directory/prueba.md'))
      .toEqual([
        {
          href: 'http://networkcultures.org/_uploads/NN%234_RosaMenkman.pdf',
          text: 'The Glitch Moment(um)',
          path: './directory/prueba.md'
        },
        {
          href: 'http://www.redefinemag.com/2014/glitch-art-expression-through-an-aesthetic-rooted-in-error/4/',
          text: 'Expression Through Error',
          path: './directory/prueba.md'
        },
        {
          href: 'http://cdm.link/',
          text: 'CDM',
          path: './directory/prueba.md'
        },
        {
          href: 'https://www.reddit.com/r/videosynthesis/',
          text: 'https://www.reddit.com/r/videosynthesis/',
          path: './directory/prueba.md'
        },
        {
          href: 'https://docpop.org/',
          text: 'https://docpop.org/',
          path: './directory/prueba.md'
        },
        {
          href: 'https://www.facebook.com/groups/GACToolTime/',
          text: 'https://www.facebook.com/groups/GACToolTime/',
          path: './directory/prueba.md'
        }
      ]);
  });
});

describe('getAllFilesMd', () => {
  it('is a function', () => {
    expect(typeof index.getAllFilesMd).toBe('function');
  });
  it('should return the markdown files contained in a directory', () => {
    expect(index.getAllFilesMd('directory'))
      .toEqual(expect.arrayContaining(
        [
          'C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory\\ASDFPixelSort-master\\README.md',
          'C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory\\glitchArtGenerator.md',
          'C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory\\prueba.md',
          'C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory\\README.md'
        ]
      ));
  });
});

describe('getLinksWithPath', () => {
  it('is a function', () => {
    expect(typeof index.getLinksWithPath).toBe('function');
  });
  it('should return the absolute path of a markdown file', () => {
    expect(index.getLinksWithPath('./directory/prueba.md'))
      .toContain(
        'C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory\\prueba.md',
      );
  });
});

describe('validateAllLinks', () => {
  it('is a function', () => {
    expect(typeof index.validateAllLinks).toBe('function');
  });
  it('should return an array of objects with: href, text, path, status and statustext', () => {
    index.validateAllLinks('C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory\\prueba.md').then((res) => {
      expect(res).toEqual(expect.arrayContaining(
        [
          {
            href: 'http://networkcultures.org/_uploads/NN%234_RosaMenkman.pdf',
            text: 'The Glitch Moment(um)',
            path: './directory/prueba.md',
            status: 200,
            statusText: 'OK',
          },
          {
            href: 'http://www.redefinemag.com/2014/glitch-art-expression-through-an-aesthetic-rooted-in-error/4/',
            text: 'Expression Through Error',
            path: './directory/prueba.md',
            status: 200,
            statusText: 'OK',
          },
          {
            href: 'http://cdm.link/',
            text: 'CDM',
            path: './directory/prueba.md',
            status: 200,
            statusText: 'OK',
          },
          {
            href: 'https://www.reddit.com/r/videosynthesis/',
            text: 'https://www.reddit.com/r/videosynthesis/',
            path: './directory/prueba.md',
            status: 200,
            statusText: 'OK',
          },
          {
            href: 'https://docpop.org/',
            text: 'https://docpop.org/',
            path: './directory/prueba.md',
            status: 200,
            statusText: 'OK',
          },
          {
            href: 'https://www.facebook.com/groups/GACToolTime/',
            text: 'https://www.facebook.com/groups/GACToolTime/',
            path: './directory/prueba.md',
            status: 200,
            statusText: 'OK',
          }
        ]
      ));
    });
  });
});

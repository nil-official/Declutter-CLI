const FILE_CATEGORIES = {
    images: {
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.ico', '.tiff', '.raw', '.cr2', '.nef', '.orf', '.sr2', '.dng', '.heic', '.heif', '.avif', '.jfif', '.psd', '.ai', '.eps', '.indd'],
        folder: 'Images'
    },
    documents: {
        extensions: ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt', '.pages', '.tex', '.md', '.markdown', '.rst', '.asciidoc', '.epub', '.mobi', '.azw', '.azw3', '.fb2', '.lit', '.pdb', '.tcr', '.djvu'],
        folder: 'Documents'
    },
    spreadsheets: {
        extensions: ['.xls', '.xlsx', '.csv', '.ods', '.numbers', '.tsv', '.xlsm', '.xlsb', '.xltx', '.xltm', '.ots', '.fods', '.uos', '.dbf', '.wk1', '.wks', '.123'],
        folder: 'Spreadsheets'
    },
    presentations: {
        extensions: ['.ppt', '.pptx', '.odp', '.key', '.pps', '.ppsx', '.pptm', '.potx', '.potm', '.ppsm', '.otp', '.fodp', '.uop', '.shf'],
        folder: 'Presentations'
    },
    videos: {
        extensions: ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.m4v', '.3gp', '.3g2', '.f4v', '.asf', '.rm', '.rmvb', '.vob', '.ogv', '.drc', '.mng', '.qt', '.yuv', '.viv', '.amv', '.m4p', '.mp2', '.mpe', '.mpv', '.m2v', '.svi', '.mxf', '.roq', '.nsv'],
        folder: 'Videos'
    },
    audio: {
        extensions: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a', '.opus', '.aiff', '.au', '.ra', '.3gp', '.amr', '.awb', '.dss', '.dvf', '.m4b', '.m4p', '.mmf', '.mpc', '.msv', '.oga', '.raw', '.sln', '.tta', '.voc', '.vox', '.wv', '.8svx', '.cda'],
        folder: 'Audio'
    },
    archives: {
        extensions: ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.tgz', '.tbz2', '.txz', '.lz', '.lzma', '.z', '.cab', '.iso', '.dmg', '.hqx', '.sit', '.sitx', '.sea', '.bin', '.uu', '.ace', '.arj', '.lzh', '.arc', '.pak', '.pk3', '.pk4', '.war', '.ear', '.sar', '.jar'],
        folder: 'Archives'
    },
    code: {
        extensions: [
            // Web Technologies
            '.js', '.jsx', '.ts', '.tsx', '.html', '.htm', '.css', '.scss', '.sass', '.less', '.stylus', '.vue', '.svelte', '.php', '.asp', '.aspx', '.jsp',
            // Programming Languages
            '.py', '.pyw', '.pyc', '.pyo', '.pyd', '.ipynb', '.java', '.class', '.jar', '.cpp', '.cxx', '.cc', '.c', '.h', '.hpp', '.hxx', '.cs', '.vb', '.fs', '.fsx', '.fsi',
            '.rb', '.rbw', '.rake', '.gemspec', '.go', '.rs', '.swift', '.kt', '.kts', '.scala', '.clj', '.cljs', '.cljc', '.hs', '.lhs', '.elm', '.erl', '.hrl',
            '.ex', '.exs', '.pl', '.pm', '.t', '.pod', '.r', '.R', '.rmd', '.Rmd', '.m', '.mm', '.f', '.f90', '.f95', '.f03', '.f08', '.for', '.ftn', '.fpp',
            // Shell & Scripts
            '.sh', '.bash', '.zsh', '.fish', '.csh', '.tcsh', '.ksh', '.bat', '.cmd', '.ps1', '.psm1', '.psd1',
            // Config & Data
            '.json', '.xml', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf', '.properties', '.env', '.dotenv',
            // Database
            '.sql', '.sqlite', '.db', '.mdb', '.accdb',
            // Others
            '.lua', '.dart', '.jl', '.nim', '.cr', '.d', '.pas', '.pp', '.inc', '.asm', '.s', '.nasm', '.masm', '.cmake', '.mk', '.makefile',
            '.dockerfile', '.containerfile', '.proto', '.thrift', '.avro', '.graphql', '.gql', '.prisma', '.terraform', '.tf', '.hcl'
        ],
        folder: 'Code'
    },
    executables: {
        extensions: ['.exe', '.msi', '.msu', '.msp', '.dmg', '.pkg', '.mpkg', '.app', '.deb', '.rpm', '.snap', '.flatpak', '.appimage', '.run', '.bin', '.bundle', '.apk', '.ipa', '.xap', '.appx', '.msix', '.com', '.scr', '.pif', '.cpl', '.gadget'],
        folder: 'Applications'
    },
    fonts: {
        extensions: ['.ttf', '.otf', '.woff', '.woff2', '.eot', '.ttc', '.fon', '.fnt', '.bdf', '.pcf', '.snf', '.psf', '.dfont', '.suit', '.pfb', '.pfm', '.afm', '.pfa', '.gsf'],
        folder: 'Fonts'
    },
    ebooks: {
        extensions: ['.epub', '.mobi', '.azw', '.azw3', '.azw4', '.prc', '.tpz', '.topaz', '.kf8', '.kfx', '.fb2', '.fb2z', '.lit', '.pdb', '.pml', '.pmlz', '.rb', '.tcr', '.tr2', '.tr3', '.chm', '.htmlz', '.oeb', '.opf', '.pef', '.pkg', '.qmk', '.snb', '.wolf'],
        folder: 'E-books'
    },
    models_3d: {
        extensions: ['.obj', '.fbx', '.dae', '.3ds', '.blend', '.c4d', '.ma', '.mb', '.max', '.lwo', '.lws', '.dxf', '.ply', '.stl', '.x3d', '.gltf', '.glb', '.usd', '.usda', '.usdc', '.abc', '.iges', '.igs', '.step', '.stp', '.brep'],
        folder: '3D Models'
    },
    cad_files: {
        extensions: ['.dwg', '.dxf', '.dwf', '.dgn', '.rvt', '.rfa', '.ifc', '.skp', '.3dm', '.iam', '.ipt', '.idw', '.dwt', '.catpart', '.catproduct', '.cgr', '.model', '.exp', '.session', '.dlv', '.prt', '.asm', '.drw'],
        folder: 'CAD Files'
    },
    data_files: {
        extensions: ['.csv', '.tsv', '.json', '.xml', '.yaml', '.yml', '.parquet', '.avro', '.orc', '.hdf5', '.h5', '.nc', '.cdf', '.mat', '.rds', '.rda', '.rdata', '.sav', '.por', '.sas7bdat', '.xpt', '.dta', '.ods', '.numbers'],
        folder: 'Data Files'
    },
    system_files: {
        extensions: ['.sys', '.dll', '.so', '.dylib', '.lib', '.a', '.o', '.ko', '.mod', '.drv', '.vxd', '.ocx', '.ax', '.cpl', '.scr', '.mun', '.mui', '.cat', '.inf', '.oem', '.pnf', '.precomp', '.winmd'],
        folder: 'System Files'
    },
    logs: {
        extensions: ['.log', '.logs', '.out', '.err', '.trace', '.debug', '.crash', '.dump', '.tmp', '.temp', '.bak', '.backup', '.old', '.orig', '.swp', '.swo', '.~', '.cache'],
        folder: 'Logs & Temp'
    }
};

module.exports = { FILE_CATEGORIES };
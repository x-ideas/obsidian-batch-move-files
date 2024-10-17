import { describe, vi, beforeEach } from 'vitest';

import { vol } from 'memfs';
// import { moveObFileToAstroFile } from '../../api/sync-file';

vi.mock('fs/promises');

beforeEach(() => {
  vol.reset();
});

// mock obsidian
// const app = {
//   vault: {
//     read: '',
//   },
// };

describe('sync-file', () => {});

// describe('sync-file', () => {
//   // Verifies that the content is read from the TFile without any data loss.
//   it('should read content from a TFile without data loss', async () => {
//     // const ob = await vi.importMock('obsidian');

//     const app = {
//       vault: {
//         read: vi.fn().mockResolvedValue('[[image.png]]'),
//       },
//     };

//     const mockVault = { read: vi.fn().mockResolvedValue('[[image.png]]') };
//     const mockApp = { vault: mockVault };
//     const mockFile = { name: 'test' };
//     const mockOpt = { app: mockApp };
//     const distFolder = '/valid/path';

//     await moveObFileToAstroFile(mockFile, distFolder, mockOpt);

//     expect(mockVault.read).toHaveBeenCalledWith(mockFile);
//     // Add assertions to check if writeFile was called with correct arguments
//   });

//   // Ensures the new file is created in the specified directory with the correct name.
//   it('should create a new file in the specified directory with the correct name', async () => {
//     const mockVault = { read: vi.fn().mockResolvedValue('[[image.png]]') };
//     const mockApp = { vault: mockVault };
//     const mockFile = { name: 'test' };
//     const mockOpt = { app: mockApp };
//     const distFolder = '/valid/path';

//     await moveObFileToAstroFile(mockFile, distFolder, mockOpt);

//     expect(mockVault.read).toHaveBeenCalledWith(mockFile);
//     // Add assertions to check if writeFile was called with correct arguments
//   });

//   // Confirms that the content is written to the new file accurately.
//   it('should write content to a new file in the specified directory accurately', async () => {
//     const mockVault = { read: vi.fn().mockResolvedValue('[[image.png]]') };
//     const mockApp = { vault: mockVault };
//     const mockFile = { name: 'test' };
//     const mockOpt = { app: mockApp };
//     const distFolder = '/valid/path';

//     await moveObFileToAstroFile(mockFile, distFolder, mockOpt);

//     expect(mockVault.read).toHaveBeenCalledWith(mockFile);
//     // Add assertions to check if writeFile was called with correct arguments
//   });

//   // Checks that the function completes without throwing any errors during the process.
//   it('should complete without errors', async () => {
//     const mockVault = { read: vi.fn().mockResolvedValue('[[image.png]]') };
//     const mockApp = { vault: mockVault };
//     const mockFile = { name: 'test' };
//     const mockOpt = { app: mockApp };
//     const distFolder = '/valid/path';

//     await moveObFileToAstroFile(mockFile, distFolder, mockOpt);

//     expect(mockVault.read).toHaveBeenCalledWith(mockFile);
//     // Add assertions to check if writeFile was called with correct arguments
//   });

//   // Verifies that the destination folder is created when it does not already exist.
//   it('should create destination folder if it does not exist', async () => {
//     const mockVault = { read: vi.fn().mockResolvedValue('[[image.png]]') };
//     const mockApp = { vault: mockVault };
//     const mockFile = { name: 'test' };
//     const mockOpt = { app: mockApp };
//     const distFolder = '/valid/path';

//     await moveObFileToAstroFile(mockFile, distFolder, mockOpt);

//     expect(mockVault.read).toHaveBeenCalledWith(mockFile);
//     expect(mkdir).toHaveBeenCalledWith(distFolder, { recursive: true });
//     // Add assertions to check if writeFile was called with correct arguments
//   });
// });

/* eslint-disable no-console */

// Core
import git from 'nodegit';

// Constants
import {
    GIT_ROOT,
    SYNC_REMOTE_ORIGIN_REFERENCE,
    SYNC_BRANCH_NAME,
    SYNC_REMOTE_UPSTREAM_REFERENCE,
    MASTER_REMOTE_UPSTREAM_REFERENCE,
    GIT_HTTPS_URL,
} from '../constants';

// Instruments
import { messages } from './messages';

// Helpers
import { fetchAll, connectUpstream } from './helpers';

const sync = async () => {
    try {
        const repository = await git.Repository.open(GIT_ROOT);

        const author = git.Signature.default(repository);
        const commitMessage = 'Checkpoint';
        const parent = await repository.getHeadCommit();
        const index = await repository.refreshIndex();

        await index.addAll();
        await index.write();

        const oid = await index.writeTree();
        await repository.createCommit(
            'HEAD',
            author,
            author,
            commitMessage,
            oid,
            [ parent ],
        );
        console.log('→ 1');
        const origin = await repository.getRemote('origin');
        // console.log('→ oro', origin.bra());
        const references = await repository.getReferenceNames(3);
        console.log('→ 2', references);

        const result = await origin.push([ 'refs/heads/lectrum-dev' ], {
            prune:     1,
            callbacks: {
                credentials(url, userName) {
                    return git.Cred.sshKeyFromAgent(userName);
                },
                certificateCheck() {
                    return 1;
                },
            },
        });
        console.log('→ 3', result);
    } catch (error) {
        console.log('→ error', error);
    }
};

async function* start() {
    while (true) {
        yield await sync();
    }
}

const generator = start();

setInterval(() => {
    generator.next();
}, 1000);

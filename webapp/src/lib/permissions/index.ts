// eslint-disable-next-line
// @ts-nocheck

import * as BigBitfield from 'big-bitfield';
import Metadata from 'permissions/metadata';

export default class Permission extends BigBitfield {

	constructor(data) {
		super(data);
	}

	// List of permission bits
	static allPermissions = Object.values(Permissions)
		.filter(v => typeof v === 'number');

	// Convert to a map of bit to metadata and state, for use in frontend
	toJSON() {
		return Object.entries(Metadata)
			.reduce((acc, entry) => {
				acc[entry[0]] = {
					state: this.get(entry[0]),
					...entry[1],
				};
				return acc;
			}, {});
	}

	handleBody(body, editorPermission, handlingBits) {
		//TODO: make sure handlingBits passed to this is secure, its important to security
		for (let bit of handlingBits) {
			// If perm has no "parent" bit, or current user has the parent permission, set each bit based on the form input
			const allowedParent = Metadata[bit].parent == null
				|| editorPermission.get(Metadata[bit].parent);
			if (allowedParent && !Metadata[bit].block) {
				this.set(parseInt(bit), (body[`permission_bit_${bit}`] != null));
			}
		}
	}

	applyInheritance() { //write custom inheritance logic here? or find a way to put a flag in the metadata or permissions
		if (this.get(Permissions.ROOT)) {
			return this.setAll(Permission.allPermissions);
		}
		if (this.get(Permissions.ORG_OWNER)) {
			this.setAll(Permissions._ORG_OWNER_BITS);
		}
		if (this.get(Permissions.TEAM_OWNER)) {
			this.setAll(Permissions._TEAM_OWNER_BITS);
		}
	}

}